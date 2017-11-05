#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from django.contrib.auth.models import User

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowProjects(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.ProjectModel = ProjectModel
        self.User = User

    def get_main(self):
        user = self.unhandled_request.user
        h = self.HandleObj()
        pm = self.ProjectModel
        user_class = self.User

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        print 'user:', user
        user_id = user.id
        group_name = h.get_group_name(user)

        v1 = u'管理员'
        v2 = u'客户'
        v3 = u'服务商'
        v4 = u'物流商'

        try:
            if group_name == v1:
                print '展示 管理员 的所有项目'
                p = pm.objects.all().order_by('-id')
                data = h.get_objs_json_serialize(p)
            elif group_name == v2:
                print '展示 客户 的所有项目'
                p = pm.objects.filter(customer_id=user_id)
                data = h.get_objs_json_serialize(p)
            elif group_name == v3:
                print '展示 服务商 的所有项目'
                p = pm.objects.filter(service_provider_id=user_id)
                data = h.get_objs_json_serialize(p)
            elif group_name == v4:
                print '展示 物流商 的所有项目'
                p = pm.objects.filter(shipment_enterprise_id=user_id)
                data = h.get_objs_json_serialize(p)
            elif group_name == '':
                message = '用户没有分组'
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
