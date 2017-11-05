#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import yaml
import xlrd

from datetime import datetime

from .....my_api.handle_obj import HandleObj
from .....my_api.handle_file import HandleFile
from .....models import *


class UploadSample(object):
    def __init__(self, the_id, unhandled_request):
        self.id = the_id
        self.unhandled_request = unhandled_request

        # 载入 utils
        self.HandleObj = HandleObj
        self.HandleFile = HandleFile

        # 载入 report models
        self.ProjectModel = ProjectModel
        self.SampleModel = SampleModel

    def get_main(self):
        save_files_return_addrs = self._save_files_return_addrs
        import_samples = self._import_samples
        reset_samples = self._reset_samples

        # 初始化 response
        success = ''
        fail = ''
        message = ''
        data = ''

        try:
            # 将已有样本信息设置 active = False
            reset_samples()

            # 提取数据
            file_dir = 'samples'
            datetime_now = datetime.now()
            addrs = save_files_return_addrs(datetime_now, file_dir)

            # 数据导入数据库, 并返回 samples
            data = import_samples(addrs)

            success = True
            message = '上传成功'
        except:
            fail = True

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
            new_name = file_name + ' ' + date_str

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

    def _import_samples(self, addrs):
        project_id = self.id
        sample = self.SampleModel
        p = self.ProjectModel
        handle_obj = self.HandleObj()
        handle_file = self.HandleFile()
        addrs = addrs

        # 保存数据, 用于 response
        samples = []

        project = p.objects.get(id=project_id)
        for file_addr in addrs:
            file_suffix = handle_file.get_file_suffix(file_addr)
            if file_suffix == 'xls' or file_suffix == 'xlsx':
                book = xlrd.open_workbook(file_addr.encode('utf-8'))
                # 目前只考虑sheets为1的情况
                sh = book.sheet_by_index(0)

                for i in range(sh.nrows):
                    if i >= 1:
                        identifier = sh.row(i)[0].value
                        genre = sh.row(i)[1].value
                        storage_medium = sh.row(i)[2].value
                        number = sh.row(i)[3].value
                        grouping = sh.row(i)[4].value
                        remark = sh.row(i)[5].value
                        project = project

                        obj = {
                            'identifier': identifier,
                            'genre': genre,
                            'storage_medium': storage_medium,
                            'number': number,
                            'grouping': grouping,
                            'remark': remark,
                            'project': project,
                        }
                        s = sample()
                        handle_obj.save_new_instance(s, obj)

                        # 替换 project, 用作 response
                        obj['project'] = project.id
                        samples.append(obj)
            else:
                raise '上传样本的格式错误, 须为 xls 或 xlsx'
        return samples

    def _reset_samples(self):
        project_id = self.id
        h = self.HandleObj()
        sample_class = self.SampleModel
        samples = sample_class.objects.filter(active=True, project__id=project_id)
        t = len(samples)
        if t > 0:
            data = {
                'active': False,
            }
            for i in samples:
                h.save_new_instance(i, data)
        return
