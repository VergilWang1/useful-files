#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from django.contrib.auth.models import User

from .....my_api.handle_obj import HandleObj
from .....models import *


class CreateProject(object):
    def __init__(self, unhandled_request):
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj

        # 载入 django models
        self.ProjectModel = ProjectModel
        self.SystemContact = SystemContact
        self.User = User

    def get_main(self):
        t = self.unhandled_request
        source_datas = t.POST
        user = t.user

        h = self.HandleObj()

        save_datas = self._save_datas

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        group_name = h.get_group_name(user)

        k = 'save'
        save = h.loads_json_datas(k, source_datas)

        print 'save:', save
        try:
            # 创建项目
            save_datas(group_name, save)
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

    def _save_datas(self, group_name, datas):
        t = self.unhandled_request
        user = t.user
        user_id = user.id

        project_obj = self.ProjectModel

        get_system_contact = self._get_system_contact

        h = self.HandleObj()

        system_contact = get_system_contact()
        for i in datas:
            # 设置项目创创建时间
            now = datetime.now()
            i['create_date'] = now

            # 设置系统信息外键
            i['system_contact'] = system_contact

            # 设置客户 id
            if group_name == u'客户':
                i['customer_id'] = user_id

            # 保存项目
            instance = project_obj()
            h.save_new_instance(instance, i)
            # 设置 label '项目已创建'
            project = instance
            label = '项目已创建'
            h.set_project_label(project, label)
            # 添加项目详情
            h.set_project_process_detail(project, label)
        return

    def _get_system_contact(self):
        system_obj = self.SystemContact
        h = self.HandleObj()

        system_contact = system_obj.objects.all().order_by('id').first()
        if system_contact is None:
            email = 'lbsdyx@126.com'
            phone = '13166218184'
            data = {
                'email': email,
                'phone': phone,
            }
            system_contact = system_obj()
            h.save_new_instance(system_contact, data)
        r = system_contact
        return r
