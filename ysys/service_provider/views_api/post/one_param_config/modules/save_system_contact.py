#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class SaveSystemContact(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.SystemContact = SystemContact

    def get_main(self):
        source_datas = self.unhandled_request.POST
        h = self.HandleObj()

        save_system_contact = self._save_system_contact

        # initial post response info
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            k = 'save'
            save = h.loads_json_datas(k, source_datas)
            save_system_contact(save)
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

    def _save_system_contact(self, datas):
        h = self.HandleObj()
        system_contact_class = self.SystemContact

        save = datas
        for i in save:
            # 获取 contact ID, 取得 contact obj, 然后删除保存信息里的 id, 最后保存
            contact_id = i['id']
            contact = system_contact_class.objects.get(id=contact_id)
            i.pop('id')
            h.save_new_instance(contact, i)
        return
