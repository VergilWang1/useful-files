#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class CreateNewProcessModel(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.NewProcessModel = NewProcessModel

    def get_main(self):
        source_datas = self.unhandled_request.POST
        h = self.HandleObj()
        process = self.NewProcessModel

        # initial post response info
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            k = 'save'
            save = h.loads_json_datas(k, source_datas)
            for i in save:
                instance = process()
                h.save_new_instance(instance, i)
                # 返回 process model 信息
                tmp = [instance]
                t = h.get_objs_json_serialize(tmp)
                data = t
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
