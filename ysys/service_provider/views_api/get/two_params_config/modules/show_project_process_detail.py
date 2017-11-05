#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowProjectProcessDetail(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.ProjectProgressDetailModel = ProjectProgressDetailModel

    def get_main(self):
        project_id = self.id_1
        h = self.HandleObj()
        detail_class = self.ProjectProgressDetailModel

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            details = detail_class.objects.filter(active=True, project__id=project_id)
            data = h.get_objs_json_serialize(details)
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
