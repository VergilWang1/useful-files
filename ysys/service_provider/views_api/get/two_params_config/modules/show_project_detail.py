#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowProjectDetail(object):
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

        # 获取项目, 并构造信息
        p = project.objects.filter(id=the_id)
        info = h.get_objs_json_serialize(p)

        data = info

        # # 获取项目状态, 并构造信息
        # ps = project_state.objects.filter(project_id=the_id)
        # status = h.get_objs_json_serialize(ps)

        # # 获取项目样本
        # sp = sample.objects.filter(project_id=the_id).order_by('id')
        # samples = h.get_objs_json_serialize(sp)

        # result = {
        #     'projects_info': info,
        #     'projects_status': status,
        #     'projects_samples': samples,
        # }

        r = {
            'success': success,
            'fail': fail,
            'message': message,
            'data': data,
        }
        return r
