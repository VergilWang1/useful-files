#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.contrib.auth.models import User
# from ..models import *

from .smslib import alismslib
from .my_email import Email


class TasksApi(object):
    def __init__(self):
        self.User = User

        self.ali_send_message = alismslib
        self.Email = Email

    def send_half_cycle_message(self, project, step):
        get_phones_and_emails = self._get_phones_and_emails
        send_msgs = self._send_msgs
        send_emails = self._send_emails
        get_msg_txt = self._get_msg_txt

        phones, emails = get_phones_and_emails(project, step)
        print 'phones:', phones
        print 'emails:', emails

        step_name = step.name.encode('utf-8')
        msg_txt = '{}周期已经过半啦'.format(step_name)
        template = get_msg_txt(msg_txt)
        send_msgs(phones, template)

        email_txt = '{}周期已经过半啦'.format(step_name)
        send_emails(emails, email_txt)
        return

    def send_step_done_message(self, project, step):
        get_phones_and_emails = self._get_phones_and_emails
        send_msgs = self._send_msgs
        send_emails = self._send_emails
        get_msg_txt = self._get_msg_txt

        msg_content = step.message_content.encode('utf-8')
        email_content = step.email_content.encode('utf-8')

        phones, emails = get_phones_and_emails(project, step)
        print 'phones:', phones
        print 'emails:', emails

        msg_txt = msg_content
        template = get_msg_txt(msg_txt)
        send_msgs(phones, template)

        email_txt = email_content
        send_emails(emails, email_txt)
        return

    def _get_phones_and_emails(self, project, step):
        send_message = step.send_message
        send_email = step.send_email

        user = self.User
        phones = []
        emails = []

        t = step.yunbio
        if t:
            yunbio_phone = project.system_contact.phone
            yunbio_email = project.system_contact.email
            if send_message:
                phones.append(yunbio_phone)
            if send_email:
                emails.append(yunbio_email)

        t = step.customer
        if t:
            customer_id = project.customer_id
            customer = user.objects.get(id=customer_id)
            phone = customer.username
            email = customer.email
            if send_message:
                phones.append(phone)
            if send_email:
                emails.append(email)

        t = step.service_provider
        if t:
            service_provider_id = project.service_provider_id
            service_provider = user.objects.get(id=service_provider_id)
            phone = service_provider.username
            email = service_provider.email
            if send_message:
                phones.append(phone)
            if send_email:
                emails.append(email)

        t = step.shipment_enterprise
        if t:
            shipment_enterprise_id = project.shipment_enterprise_id
            shipment_enterprise = user.objects.get(id=shipment_enterprise_id)
            phone = shipment_enterprise.username
            email = shipment_enterprise.email
            if send_message:
                phones.append(phone)
            if send_email:
                emails.append(email)
        return phones, emails

    def _send_emails(self, emails, message):
        send_email = self.Email()
        for email in emails:
            send_email.send(email, message)
        return

    def _send_msgs(self, phones, message):
        k = 'LTAIUiR3KxPY60rY'
        k1 = 'GrzW8UNuBWGTvhAf46QZpjnjG52rr2'
        s = self.ali_send_message(k, k1)
        for phone in phones:
            s.sendsms('茹翔信息',
                      'SMS_47860087',
                      phone,
                      message)
        return

    def _get_msg_txt(self, message):
        txt = '{"code":"' + str(message) + '"}'
        return txt

    def send_msg_to_customer(self,
                             project,
                             message,
                             send_msg=False,
                             send_email=True):
        user = self.User

        get_msg_txt = self._get_msg_txt
        send_msgs = self._send_msgs
        send_emails = self._send_emails

        customer_id = project.customer_id
        customer = user.objects.get(id=customer_id)
        phone = customer.username
        email = customer.email

        msg_txt = message
        if send_msg:
            template = get_msg_txt(msg_txt)
            v = [phone]
            send_msgs(v, template)

        if send_email:
            v = [email]
            send_emails(v, msg_txt)
        return

    def send_msg_to_service_provider(self,
                                     project,
                                     message,
                                     send_msg=False,
                                     send_email=True):
        user = self.User

        get_msg_txt = self._get_msg_txt
        send_msgs = self._send_msgs
        send_emails = self._send_emails

        service_provider_id = project.service_provider_id
        service_provider = user.objects.get(id=service_provider_id)
        phone = service_provider.username
        email = service_provider.email

        msg_txt = message
        if send_msg:
            template = get_msg_txt(msg_txt)
            v = [phone]
            send_msgs(v, template)

        if send_email:
            v = [email]
            send_emails(v, msg_txt)
        return

    def send_msg_to_shipment_enterprise(self,
                                        project,
                                        message,
                                        send_msg=False,
                                        send_email=True):
        user = self.User

        get_msg_txt = self._get_msg_txt
        send_msgs = self._send_msgs
        send_emails = self._send_emails

        shipment_enterprise_id = project.shipment_enterprise_id
        shipment_enterprise = user.objects.get(id=shipment_enterprise_id)
        phone = shipment_enterprise.username
        email = shipment_enterprise.email

        msg_txt = message
        if send_msg:
            template = get_msg_txt(msg_txt)
            v = [phone]
            send_msgs(v, template)

        if send_email:
            v = [email]
            send_emails(v, msg_txt)
        return

    def send_msg_to_yunbio(self,
                           project,
                           message,
                           send_msg=False,
                           send_email=True):
        get_msg_txt = self._get_msg_txt
        send_msgs = self._send_msgs
        send_emails = self._send_emails

        phone = project.system_contact.phone
        email = project.system_contact.email

        msg_txt = message
        if send_msg:
            template = get_msg_txt(msg_txt)
            v = [phone]
            send_msgs(v, template)

        if send_email:
            v = [email]
            send_emails(v, msg_txt)
        return

    # def check_is_today(date):
    #     # 判断 date 是否与今天的日期一致
    #     today = datetime.now().day
    #     date_day = date.day
    #     r = today == date_day
    #     return r

    def check_is_workday(self, date):
        # 检查是否为工作日
        t = date.weekday()
        r = t in range(0, 5)
        return r
