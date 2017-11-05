#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowNewProcessStep(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models        self.ProjectModel = ProjectModel
        self.ProjectModel = ProjectModel
        self.NewProcessStep = NewProcessStep

    def get_main(self):
        project_id = self.id_1
        h = self.HandleObj()
        project_class = self.ProjectModel
        step_class = self.NewProcessStep

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            project = project_class.objects.get(id=project_id)
            process_model_id = project.new_process.id
            step_models = (step_class.objects
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
