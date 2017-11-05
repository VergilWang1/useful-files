#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowNewProcessDetail(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.ProjectModel = ProjectModel
        self.NewProcess = NewProcess

    def get_main(self):
        project_id = self.id_1
        h = self.HandleObj()
        project_class = self.ProjectModel
        process_class = self.NewProcess

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            project = project_class.objects.get(id=project_id)
            process_id = project.new_process.id
            process = process_class.objects.filter(id=process_id)
            data = h.get_objs_json_serialize(process)
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
