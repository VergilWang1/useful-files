#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class SaveNewProcessStepModel(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.NewProcessStepModel = NewProcessStepModel

    def get_main(self):
        source_datas = self.unhandled_request.POST
        h = self.HandleObj()

        save_step = self._save_step

        # initial post response info
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            # 取出数据
            k = 'save'
            save = h.loads_json_datas(k, source_datas)
            # 保存 step 信息
            save_step(save)
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

    def _save_step(self, datas):
        h = self.HandleObj()
        step_class = self.NewProcessStepModel

        save = datas
        for i in save:
            # 获取 step ID, 取得 step obj, 然后删除保存信息里的 id, 最后保存
            step_id = i['id']
            step = step_class.objects.get(id=step_id)
            i.pop('id')
            h.save_new_instance(step, i)
        return
