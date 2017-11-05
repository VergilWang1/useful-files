#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowProjectSamples(object):
    def __init__(self, the_id, unhandled_request):
        self.id = the_id
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.ProjectModel = ProjectModel
        self.SampleModel = SampleModel

    def get_main(self):
        the_id = self.id
        h = self.HandleObj()
        project = self.ProjectModel
        sample = self.SampleModel

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        # 获取项目样本
        sp = sample.objects.filter(active=True, project_id=the_id).order_by('id')
        samples = h.get_objs_json_serialize(sp)

        data = samples

        r = {
            'success': success,
            'fail': fail,
            'message': message,
            'data': data,
        }
        return r
