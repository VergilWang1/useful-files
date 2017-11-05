#!/usr/bin/env python
# -*- coding: utf-8 -*-

import smtplib

from email.mime.text import MIMEText
from email.header import Header
from email.utils import parseaddr, formataddr
from email.mime.multipart import MIMEMultipart

from service_provider.models import *


class Email(object):
    def __init__(self):
        self.smtplib = smtplib
        self.MIMEText = MIMEText
        self.MIMEMultipart = MIMEMultipart
        self.Header = Header
        self.formataddr = formataddr
        self.parseaddr = parseaddr

        # 获取系统发件账号信息
        t = SystemContact.objects.all().order_by('id').last()
        from_addr = t.email.encode('utf-8')
        password = t.email_password.encode('utf-8')
        smtp_server = t.phone.encode('utf-8')
        self.from_addr = from_addr
        self.password = password
        # 发件服务器地址
        self.smtp_server = smtp_server

        # 测试用收件地址
        self.to_addr = '411425403@qq.com'
        self.to_addr1 = 'lbsdyx@126.com'

    def send(self, addrs, content):
        get_msg = self._get_msg
        server = self._use_server
        check = self._check_addrs

        addrs = check(addrs)

        # msg = get_msg()
        msg = self._get_msg_new(addrs, content)
        server(addrs, msg)
        return

    def _check_addrs(self, addrs):
        t = type(addrs)
        r = t == list
        if r:
            return addrs
        else:
            t = []
            t.append(addrs)
            return t

    def _format_addr(self, data):
        header = self.Header
        pars = self.parseaddr
        fm = self.formataddr
        name, addr = pars(data)
        return fm(( \
            header(name, 'utf-8').encode(), \
            addr.encode('utf-8') if isinstance(addr, unicode) else addr))

    def _get_msg(self):
        header = self.Header
        msg_text = self.MIMEText
        mime_mul = self.MIMEMultipart
        from_addr = self.from_addr
        _format_addr = self._format_addr

        # 只能用 MIMEMultipart 才能发 html 不知道原因
        # html 只能写在 MIMEText 中, 且必须包含 html body p 标签
        msg = mime_mul()
        msg['From'] = _format_addr(u'云生物 <%s>' % from_addr)
        msg['To'] = _format_addr(u'尊敬的用户 <>')
        msg['Subject'] = header(u'来自云生物管理系统', 'utf-8').encode()

        txt = '我是传值的变量'
        msg.attach(msg_text((
                '<html><body>'
                '<h1>云生物:</h1>'
                '<a href="http://www.baidu.com">python {}</a>'
                '</body></html>'
            ).format(txt), 'html', 'utf-8')
        )
        return msg

    def _get_msg_new(self, addrs, text):
        header = self.Header
        msg_text = self.MIMEText
        mime_mul = self.MIMEMultipart
        from_addr = self.from_addr
        _format_addr = self._format_addr

        to_addr = addrs[0]

        # 只能用 MIMEMultipart 才能发 html 不知道原因
        # html 只能写在 MIMEText 中, 且必须包含 html body p 标签
        msg = mime_mul()
        msg['From'] = _format_addr(u'云生物 <%s>' % from_addr)
        msg['To'] = _format_addr(u'尊敬的用户 <%s>' % to_addr)
        msg['Subject'] = header(u'来自云生物管理系统', 'utf-8').encode()

        msg.attach(
            msg_text(
                ('{}').format(text),
                'html',
                'utf-8',
            )
        )

        return msg

    def _use_server(self, to_addrs, message):
        smtp_server = self.smtp_server
        smtp = self.smtplib
        from_addr = self.from_addr
        password = self.password

        msg = message
        to_addrs = to_addrs

        server = smtp.SMTP(smtp_server, 25)
        server.set_debuglevel(1)
        server.login(from_addr, password)
        # server.sendmail(from_addr, [to_addr, to_addr1], msg.as_string())
        server.sendmail(from_addr, to_addrs, msg.as_string())
        server.quit()
