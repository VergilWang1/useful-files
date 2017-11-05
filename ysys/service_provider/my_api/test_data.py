#!/usr/bin/env python
# -*- coding: utf-8 -*-


class TestData(object):
    def __init__(self):
        pass

    def get_project_data(self):
        # 客户创建的项目数据
        data = {
            'id': 1,
            'date': '20178-08-23',  # 项目创建时间
            'testing_index': '我是检测指标',  # 检测指标
            'content': '我是内容',  # 内容
            'species': '我是物种',  # 物种
            'samples_num': 8,   # 样本数量
            'addr': '中山北路华宜大厦1号楼1102室R-16',     # 取样地址
            'take_date': '2017-08-25',     # 取样时间
            'instruction': True,   # 样品均质化说明, 填 boolean

            'progress': '我是项目进度',    # 项目进度, 应有 项目进度表 项目id 作为外键

            'progress_value': '我是项目进度值',   # 项目进度值, 应有 项目进度值表 项目id 作为外键

            'datas': '我是样本数据',     # 客户导入的数据, 应有 项目样本表 项目id 作为外键

            'process': '',      # 项目流程, 应有 项目流程表 项目id 作为外键

            'child_process': '',      # 项目子流程, 应有 项目子流程表 项目流程id 作为外键

            'transport_assessment': '物流评价',     # 物流评价, 应有 物流评价表 项目id 作为外键

            'provider_assessment': '服务商评价',     # 服务商评价, 应有 服务商评价表 项目id 作为外键

            'customer_status': '状态',     # 客户项目状态, 应有 客户项目状态表 项目id 作为外键

        }
        return data
