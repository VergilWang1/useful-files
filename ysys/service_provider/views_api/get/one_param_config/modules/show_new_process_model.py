#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowNewProcessModel(object):
    def __init__(self,unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.NewProcessModel = NewProcessModel
        self.NewProcessStepModel = NewProcessStepModel

    def get_main(self):
        h = self.HandleObj()
        process_model_obj = self.NewProcessModel

        set_default_process_model = self._set_default_process_model

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            set_default_process_model()

            process_models = process_model_obj.objects.all().order_by('id')

            data = h.get_objs_json_serialize(process_models)
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

    def _set_default_process_model(self):
        h = self.HandleObj()
        process_model_obj = self.NewProcessModel
        process_step_model_obj = self.NewProcessStepModel

        processes = process_model_obj.objects.all()
        t = processes is []

        # 开发环境用 t == False
        # 生产环境须 t == True
        if t:
            process = process_model_obj()
            process.name = '默认流程模板'
            process.save()

            step_data = [
                {
                    'name': '质检',
                    'cycle': 5,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
                {
                    'name': '核查',
                    'cycle': 0,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
                {
                    'name': '确认',
                    'cycle': 0,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
                {
                    'name': '预实验',
                    'cycle': 5,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
                {
                    'name': '核查',
                    'cycle': 0,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
                {
                    'name': '确认',
                    'cycle': 0,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
                {
                    'name': '正式实验',
                    'cycle': 5,
                    'send_message': True,
                    'send_email': True,
                    'customer': True,
                },
            ]
            for data in step_data:
                step = process_step_model_obj()
                data['process_model'] = process
                h.save_new_instance(step, data)
        return
