#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os


class HandleFile(object):
    def __init__(self):
        pass

    def save_file(self, file, file_addr):
        with open(file_addr.encode('utf-8'), 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)

    def create_file_addr(self, base_addr, folder_name, file_name, file_suffix):
        a = base_addr
        b = folder_name
        c = file_name
        d = file_suffix

        t = base_addr[-1]
        if t == '/':
            addr = '{}{}/{}.{}'.format(a, b, c, d)
        else:
            addr = '{}/{}/{}.{}'.format(a, b, c, d)
        return addr

    def check_exists(self, file_addr):
        create_file_addr = self.create_file_addr

        # 获取 dir
        t = file_addr.split('/')
        file_dir = t[-2]

        # 获取 file 的 name suffix
        filename = t[-1]
        fn = filename.split('.')
        file_name = fn[0]
        file_suffix = fn[1]

        # 删除 filename 和 dir
        for i in range(2):
            t.pop()
        base_addr = '/'.join(t)

        exist_name = True
        num = 1
        while exist_name:
            # 检测目标 dir 下是否有重名文件
            t = os.path.exists(file_addr)
            if t:
                if num >= 2:
                    file_name = file_name[:-1] + str(num)
                else:
                    file_name += '-' + str(num)
                file_addr = create_file_addr(base_addr,
                                             file_dir,
                                             file_name,
                                             file_suffix)
            else:
                exist_name = False
            num += 1
        return file_addr

    def get_file_name(self, file_addr):
        split_dir = file_addr.split('/')
        filename = split_dir[-1]
        t = filename.split('.')
        name = t[0]
        return name

    def get_file_suffix(self, file_addr):
        split_dir = file_addr.split('/')
        filename = split_dir[-1]
        t = filename.split('.')
        suffix = t[1]
        return suffix
