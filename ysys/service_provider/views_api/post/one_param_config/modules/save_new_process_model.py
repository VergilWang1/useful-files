#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class SaveNewProcessModel(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.NewProcessModel = NewProcessModel

    def get_main(self):
        source_datas = self.unhandled_request.POST
        h = self.HandleObj()

        save_process = self._save_process

        # initial post response info
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            k = 'save'
            save = h.loads_json_datas(k, source_datas)
            save_process(save)
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

    def _save_process(self, datas):
        h = self.HandleObj()
        process_class = self.NewProcessModel

        save = datas
        for i in save:
            # 获取 process ID, 取得 process obj, 然后删除保存信息里的 id, 最后保存
            process_id = i['id']
            process = process_class.objects.get(id=process_id)
            i.pop('id')
            h.save_new_instance(process, i)
        return
