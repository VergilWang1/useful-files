#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowSystemContact(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.SystemContact = SystemContact

    def get_main(self):
        h = self.HandleObj()
        system_contact_class = self.SystemContact

        set_default_contact = self._set_default_contact

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            set_default_contact()

            contacts = system_contact_class.objects.all().order_by('id')

            data = h.get_objs_json_serialize(contacts)
            success = True
        except:
            fail = True
        r = {
            'success': success,
            'fail': fail,
            'message': message,
            'data': data,
        }
        return r

    def _set_default_contact(self):
        h = self.HandleObj()
        system_contact_class = self.SystemContact

        contacts = system_contact_class.objects.all()
        t = contacts is None

        # 开发环境用 t == False
        # 生产环境须 t == True
        if t:
            default = [
                {
                    'name': '系统接收消息配置',
                    'email': 'lbsdyx@126.com',
                    'email_password': None,
                    'phone': '13166218184',
                },
                {
                    # 目前只能使用 sina 邮箱
                    'name': '系统发送消息配置',
                    'email': 'lbsdyx01@sina.cn',
                    'email_password': 'yunshengwu2017',
                    # 发送邮件代理服务器
                    'phone': 'smtp.sina.cn',
                },
            ]
            for data in default:
                t = system_contact_class()
                h.save_new_instance(t, data)
        return
