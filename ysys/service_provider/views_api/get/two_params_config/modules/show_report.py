#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.contrib.auth.models import User

from .....my_api.handle_obj import HandleObj
from .....models import *


class ShowReport(object):
    def __init__(self, id_1, unhandled_request):
        self.id_1 = id_1
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.ProjectModel = ProjectModel
        self.User = User

    def get_main(self):
        project_id = self.id_1
        t = self.unhandled_request
        user = t.user

        h = self.HandleObj()

        project_obj = self.ProjectModel

        get_report = self._get_report

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        print 'user:', user
        group_name = h.get_group_name(user)
        print 'group_name:', group_name

        project = project_obj.objects.get(id=project_id)

        report_obj = (project.report
                      .filter(active=True)
                      .order_by('id')
                      .last())
        print 'report_obj:', report_obj

        try:
            report = get_report(report_obj, group_name)

            data = report
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

    def _get_report(self, report_obj, group_name):
        get_report_info = self._get_report_info

        report = ''
        if report_obj is not None:
            # 服务商
            if group_name == u'服务商':
                print '我是服务商'
                # 云生物没确认且客户没确认
                yunbio_confirm = report_obj.yunbio_confirm
                customer_confirm = report_obj.customer_confirm
                v1 = not yunbio_confirm
                v2 = not customer_confirm
                if v1 and v2:
                    report = get_report_info(report_obj)
            # 云生物
            if group_name == u'管理员':
                print '我是管理员'
                # 客户没确认
                customer_confirm = report_obj.customer_confirm
                if not customer_confirm:
                    report = get_report_info(report_obj)
            # 客户
            if group_name == u'客户':
                print '我是客户'
                # 云生物确认
                yunbio_confirm = report_obj.yunbio_confirm
                if yunbio_confirm:
                    report = get_report_info(report_obj)
        return report

    def _get_report_info(self, report_obj):
        h = self.HandleObj()
        tt = [report_obj]
        report = h.get_objs_json_serialize(tt)
        return report
