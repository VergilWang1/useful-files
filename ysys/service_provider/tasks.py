#!/usr/bin/env python
# -*- coding: utf-8 -*-

from celery import task, platforms

from datetime import datetime, timedelta
from .models import *

from my_api.celery_tasks import TasksApi
from my_api.handle_obj import HandleObj

platforms.C_FORCE_ROOT = True

# 启动 worker, python manage.py celery worker -c 4 -l info
# 启动 beat, python manage.py celery beat


# @task(name='hello')
# def hello(message, debug=False):
#     t = debug
#     print 'welcome to celery! {}'.format(message)
#     if not t:
#         hello.delay('second times', True)


@task(name='check_take_sample_datetime')
def check_take_sample_datetime():
    # 按 id 倒序检查每个 project 的取样时间
    projects = ProjectModel.objects.filter(
        complete=False,
        take_sample_complete=False,
    ).order_by('-id')

    for project in projects:
        take_time_confirm = project.take_sample_time_confirm
        if take_time_confirm:
            # 检查是否到了取样的日期
            now = datetime.now()
            tmp_date = now.date()
            tmp_time = now.time()

            take_date = project.take_sample_date
            print 'is today?', tmp_date >= take_date
            t = tmp_date >= take_date
            if t:
                # 检查是否到了取样时间
                take_time = project.take_sample_time
                print 'is time?', tmp_time >= take_time
                t = tmp_time >= take_time
                if t:
                    # 发消息

                    # 添加信息

                    # 此时应该向数据库增加一条 '取样中' 的数据
                    print '取样中...'

                    # 改变取样状态
                    project.take_sample_complete = True
                    project.save()
                    # 设置 label '取样中'
                    label = '取样中'
                    h = HandleObj()
                    h.set_project_label(project, label)
                    # 添加项目详情
                    h.set_project_process_detail(project, label)
    return


@task(name='check_accept_sample_datetime')
def check_accept_sample_datetime():
    projects = ProjectModel.objects.filter(
        complete=False,
        take_sample_complete=True,
        accept_sample_complete=False,
    ).order_by('-id')

    for project in projects:
        # 检查是否到了收样的日期
        now = datetime.now()
        tmp_date = now.date()
        tmp_time = now.time()

        accept_date = project.accept_sample_date
        if accept_date is not None:
            t = tmp_date >= accept_date
            print 'accept is today?', t
            if t:
                # 检查是否到了收样时间
                take_time = project.accept_sample_time
                t = tmp_time >= take_time
                print 'is time?', t
                if t:
                    # 发消息
                    t = TasksApi()
                    txt = '已收样'
                    # 短信发送频繁会有被限制
                    t.send_msg_to_customer(project, txt)

                    # 改变收样状态
                    project.accept_sample_complete = True
                    project.save()
                    # 设置 label '已收样'
                    label = '已收样'
                    h = HandleObj()
                    h.set_project_label(project, label)
                    # 添加项目详情
                    h.set_project_process_detail(project, label)

    return


@task(name='start_process')
def start_process():
    projects = ProjectModel.objects.filter(
        complete=False,
        accept_sample_complete=True,
    ).order_by('-id')

    for project in projects:
        first_step = (project
                      .new_process
                      .process_step
                      .filter(active=True)
                      .order_by('id')
                      .first())
        t = first_step.running
        if not t:
            now = datetime.now()
            tmp_date = now.date()
            tmp_time = now.time()

            # 确定质检日期
            t = project.accept_sample_date
            delta = timedelta(days=1)
            quality_inspection_date = t + delta
            v = tmp_date >= quality_inspection_date
            # 判断工作日
            tasks_api = TasksApi()
            vv = tasks_api.check_is_workday(tmp_date)
            # 判断是否到 8:00
            t = datetime(now.year,
                         now.month,
                         now.day,
                         8,
                         0,
                         0)
            eight_clock = t.time()
            vvv = tmp_time >= eight_clock
            print v, vv, vvv
            t = v and vv and vvv
            if t:
                # 发消息
                txt = '质检开始'
                tasks_api.send_msg_to_customer(project, txt)
                # 添加信息

                # 改变状态
                # 设置流程中的第一个步骤为可运行
                first_step.start_date = tmp_date
                first_step.start_time = eight_clock
                first_step.running = True
                first_step.save()
                # 设置 label 'xx中'
                name = first_step.name
                label = name + u'中'
                h = HandleObj()
                h.set_project_label(project, label)
                # 添加项目详情
                content = name + u'已开始'
                h.set_project_process_detail(project, content)
    return


@task(name='check_step_running')
def check_step_running():
    projects = ProjectModel.objects.filter(
        complete=False,
        accept_sample_complete=True,
    ).order_by('-id')

    for project in projects:
        step = (project
                .new_process
                .process_step
                .filter(active=True, complete=True)
                .order_by('id')
                .last())
        # 要考虑 step 为 [] 的情况
        if step is not None:
            # 需要检查是否为最后一个步骤, 是则项目结束
            the_last_step = (project
                             .new_process
                             .process_step
                             .filter(active=True)
                             .order_by('id')
                             .last())

            tasks_api = TasksApi()

            t = step == the_last_step
            if t:
                print '项目结束'
                # 发消息
                tasks_api.send_step_done_message(project, step)

                # 设置项目 complete=True
                project.complete = True
                project.save()
                # 设置 label '项目已结束'
                label = '项目已结束'
                h = HandleObj()
                h.set_project_label(project, label)
                # 添加项目详情
                h.set_project_process_detail(project, label)
            else:
                print 'step:', step, step.id
                all_steps = (project
                             .new_process
                             .process_step
                             .filter(active=True)
                             .order_by('id'))

                # 获取时间
                now = datetime.now()
                tmp_date = now.date()
                tmp_time = now.time()

                # 获取下一个步骤, 并设置状态为可运行, 开始时间
                step_index = ''
                tmp_num = 0
                for i in all_steps:
                    if step == i:
                        step_index = tmp_num
                    tmp_num += 1
                next_index = step_index + 1
                next_step = all_steps[next_index]
                print 'next_step:', next_step

                # 检查下一个 step 是否为已运行
                t = next_step.running
                if not t:
                    next_step.running = True
                    next_step.start_date = tmp_date
                    next_step.start_time = tmp_time
                    next_step.save()

                    # 发消息
                    tasks_api.send_step_done_message(project, step)
                    # 设置 label 'xx中'
                    name = next_step.name
                    label = name + u'中'
                    h = HandleObj()
                    h.set_project_label(project, label)
                    # 添加项目详情
                    content = name + u'已开始'
                    h.set_project_process_detail(project, content)
    return


@task(name='check_half_cycle')
def check_half_cycle():
    projects = ProjectModel.objects.filter(
        complete=False,
        accept_sample_complete=True,
    ).order_by('-id')

    for project in projects:
        step = (project
                .new_process
                .process_step
                .filter(active=True, complete=False, running=True)
                .order_by('id')
                .first())
        if step is not None:
            t = step.cycle != 0
            if t:
                # 周期不等于 0
                t = step.half_cycle_message_status
                if not t:
                    # 到达周期一半的消息没发送
                    start_date = step.start_date
                    cycle = step.cycle
                    one_half = cycle / 2
                    # 获取时间
                    now = datetime.now()
                    tmp_date = now.date()

                    now_process_value = tmp_date - start_date
                    if now_process_value.days > one_half:
                        print '已经超过周期的一半啦'
                        # 发消息
                        tasks_api = TasksApi()
                        tasks_api.send_half_cycle_message(project, step)

                        # 设置消息状态 true
                        step.half_cycle_message_status = True
                        step.save()

    return
