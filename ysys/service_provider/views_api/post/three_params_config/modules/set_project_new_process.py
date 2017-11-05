#!/usr/bin/env python
# -*- coding: utf-8 -*-

import yaml

from datetime import datetime
from django.contrib.auth.models import User, Group, Permission
from .....models import *

from .....my_api.handle_obj import HandleObj
from .....my_api.my_email import Email


class SetProjectNewProcess(object):
    def __init__(self, id_1, id_2, unhandled_request):
        self.id_1 = id_1
        self.id_2 = id_2
        self.unhandled_request = unhandled_request

        # 载入 handle_obj
        self.HandleObj = HandleObj
        self.Email = Email

        # 载入 django models
        self.User = User
        self.ProjectModel = ProjectModel
        self.NewProcess = NewProcess
        self.NewProcessModel = NewProcessModel
        self.NewProcessStep = NewProcessStep

    def get_main(self):
        project_id = self.id_1
        source_datas = self.unhandled_request.POST

        project_obj = self.ProjectModel

        user_obj = self.User

        h = self.HandleObj()
        e = self.Email()

        set_project_new_process = self._set_project_new_process
        get_clone_process = self._get_clone_process
        get_clone_process_steps = self._get_clone_process_steps
        set_process_step = self._set_process_step

        # 初始化信息
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            process = get_clone_process()

            steps = get_clone_process_steps(process)

            set_process_step(steps)

            set_project_new_process(process)

            project = project_obj.objects.get(id=project_id)

            #
            k = 'save'
            save = h.loads_json_datas(k, source_datas)

            # 保存服务商id
            for i in save:
                h.save_new_instance(project, i)

            # 提取服务商
            service_provider_id = project.service_provider_id
            service_provider = user_obj.objects.get(id=service_provider_id)

            # 发送邮件
            t = service_provider.email
            e.send(t, '已经给你(服务商)分派了任务')

            # 设置 label '服务商已安排'
            label = '服务商已安排'
            h.set_project_label(project, label)
            # 添加项目详情
            h.set_project_process_detail(project, label)

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

    def _set_project_new_process(self, process):
        # use process instead of project.new_process
        project_id = self.id_1
        project_obj = self.ProjectModel
        project = project_obj.objects.get(id=project_id)
        project.new_process = process
        project.save()
        return

    def _get_clone_process(self):
        # 从 process model 克隆得到 process
        process_model_id = self.id_2
        process_obj = self.NewProcess
        process_model_obj = self.NewProcessModel

        h = self.HandleObj()

        process = process_obj()

        # 获取流程模板 object dict (需删除 id)
        t = process_model_obj.objects.get(id=process_model_id)
        copy_process_date = h._get_obj_dict(t)
        copy_process_date.pop('id')

        # copy new_process_model to new_process
        h.save_new_instance(process, copy_process_date)
        return process

    def _get_clone_process_steps(self, process):
        # param process 是克隆后, 应用到项目的实际 process
        process_model_id = self.id_2
        process_model_obj = self.NewProcessModel

        h = self.HandleObj()
        process_model = process_model_obj.objects.get(id=process_model_id)

        tt = process_model.process_step.all()
        tmp_process_steps = tt.order_by('id')
        tmp = []
        for i in tmp_process_steps:
            t = h._get_obj_dict(i)
            t.pop('id')
            t['process_model'] = process
            tmp.append(t)
        return tmp

    def _set_process_step(self, steps):
        process_step_obj = self.NewProcessStep

        h = self.HandleObj()

        tmp = steps
        for i in tmp:
            process_step = process_step_obj()
            h.save_new_instance(process_step, i)
        return
