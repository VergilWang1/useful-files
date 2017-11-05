#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class CreateNewProcessStepModel(object):
    def __init__(self, the_id, unhandled_request):
        self.id = the_id
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.NewProcessModel = NewProcessModel
        self.NewProcessStepModel = NewProcessStepModel

    def get_main(self):
        the_id = self.id
        source_datas = self.unhandled_request.POST
        h = self.HandleObj()
        pm = self.NewProcessModel
        st = self.NewProcessStepModel

        # initial post response info
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            # 取出数据
            k = 'save'
            save = h.loads_json_datas(k, source_datas)
            process_model = pm.objects.get(id=the_id)
            for i in save:
                # 将 process_model obj 加入到 obj
                i['process_model'] = process_model

                instance = st()
                h.save_new_instance(instance, i)
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
