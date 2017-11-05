#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowNewProcessStepModel(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.NewProcessStepModel = NewProcessStepModel

    def get_main(self):
        process_model_id = self.id_1
        h = self.HandleObj()
        step_model_class = self.NewProcessStepModel

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            step_models = (step_model_class.objects
                                           .filter(process_model__id=process_model_id)
                                           .order_by('id'))

            data = h.get_objs_json_serialize(step_models)
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
