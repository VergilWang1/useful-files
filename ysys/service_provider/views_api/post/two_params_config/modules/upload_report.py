#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import yaml

from datetime import datetime
from .....models import *

from .....my_api.handle_obj import HandleObj
from .....my_api.handle_file import HandleFile


class UploadReport(object):
    def __init__(self, the_id, unhandled_request):
        self.id = the_id
        self.unhandled_request = unhandled_request

        # 载入 utils
        self.HandleObj = HandleObj
        self.HandleFile = HandleFile

        # 载入 report models
        self.ProjectModel = ProjectModel

        t = {
            '1': QualityInspectionReportModel,
            '2': PreExperimentReportModel,
            '3': FormalExperimentReportModel,
            '4': ReportModel,
        }
        self.report_model_config = t

        # 构建文件夹
        t2 = {
            '1': 'quality_inspection_reports',
            '2': 'pre_experimentreports',
            '3': 'formal_experiment_reports',
            '4': 'reports',
        }
        self.report_dir_config = t2

    def get_main(self):
        project_id = self.id

        t = self.unhandled_request
        source_datas = t.POST

        project = self.ProjectModel
        report_model_config = self.report_model_config
        report_dir_config = self.report_dir_config

        save_files_return_addrs = self._save_files_return_addrs
        handle_file = self.HandleFile()
        handle_obj = self.HandleObj()

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        # 取出数据
        k = 'info'
        info = handle_obj.loads_json_datas(k, source_datas)

        report_key = '4'
        report_model = report_model_config[report_key]
        file_dir = report_dir_config[report_key]

        k3 = 'remark'
        remark = info[k3]

        datetime_now = datetime.now()

        addrs = save_files_return_addrs(datetime_now, file_dir)
        for file_addr in addrs:
            new_name = handle_file.get_file_name(file_addr)

            # 保存报告信息
            p = project.objects.get(id=project_id)
            obj = {
                'name': new_name,
                'addr': file_addr,
                'date': datetime_now,
                'project': p,
                'remark': remark,
            }
            r = report_model()
            handle_obj.save_new_instance(r, obj)

        success = True
        message = '上传成功'
        r = {
            'success': success,
            'fail': fail,
            'message': message,
            'data': data,
        }
        return r

    def _save_files_return_addrs(self, datetime_now, file_dir):
        handle_file = self.HandleFile()

        t = self.unhandled_request
        source_files = t.FILES
        files = source_files.values()
        addrs = []
        for file in files:
            # 提取文件后缀
            file_name, file_suffix = file.name.split('.')

            # 构造文件名
            date_str = datetime_now.strftime("%Y%m%d")
            new_name = file_name + '-' + date_str

            # 文件地址且包含文件名和后缀
            base_addr = 'service_provider/upload'
            file_addr = handle_file.create_file_addr(base_addr,
                                                     file_dir,
                                                     new_name,
                                                     file_suffix)

            # 判断文件名是否重复. 如果重复, 则附加 '-数字'
            file_addr = handle_file.check_exists(file_addr)

            # 保存文件
            handle_file.save_file(file, file_addr)

            addrs.append(file_addr)
        return addrs

    def _message(self, report_key):
        pid = self.id
        m = self.Message()

        key = report_key

        k1 = '1'
        k2 = '2'
        k3 = '3'
        k4 = '4'
        v1 = '质检报告已上传'
        v2 = '预实验报告已上传'
        v3 = '正式实验报告已上传'
        v4 = '报告已上传'
        t = {
            k1: v1,
            k2: v2,
            k3: v3,
            k4: v4,
        }
        report_message = t

        # 为项目 detail 添加内容
        obj_code = 'detail'
        c = report_message[key]
        m.send(pid, obj_code, c, user_define_message=True)
