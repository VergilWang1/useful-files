#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
import yaml

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from datetime import datetime
from collections import OrderedDict
from django.views.decorators.csrf import csrf_exempt    # 取消csrftoken验证
from django.contrib.auth.models import User

from .models import *
from my_api.handle_obj import HandleObj
from .views_api.use_config import UseConfig
from .views_api.get.one_param_config.config import OneParamConfig
from .views_api.get.two_params_config.config import TwoParamsConfig
from .views_api.post.one_param_config.config import OneParamConfigPost
from .views_api.post.two_params_config.config import TwoParamsConfigPost
from .views_api.get.three_params_config.config import ThreeParamsConfig
from .views_api.post.three_params_config.config import ThreeParamsConfigPost
from .views_api.post.four_params_config.config import FourParamsConfigPost

from .tasks import *


# Create your views here.


def hello(request):
    results = {
        'hi': 'hello world!',
    }

    # 测试 crontab
    check_step_running.delay()

    html = 'hello/hello.html'


    # html = 'service_provider/post/one_param_config/create_new_process_model.html'
    # html = 'service_provider/post/one_param_config/create_project.html'
    # html = 'service_provider/post/one_param_config/save_new_process_model.html'
    # html = 'service_provider/post/one_param_config/save_new_process_step_model.html'
    html = 'service_provider/post/one_param_config/save_system_contact.html'

    # html = 'service_provider/post/two_params_config/upload_report.html'
    # html = 'service_provider/post/two_params_config/upload_sample.html'
    # html = 'service_provider/post/two_params_config/select_process.html'
    # html = 'service_provider/post/two_params_config/change_state.html'
    # html = 'service_provider/post/two_params_config/create_new_process_step_model.html'
    # html = 'service_provider/post/two_params_config/reset_project.html'

    # html = 'service_provider/post/three_params_config/set_shipment_enterprise.html'
    # html = 'service_provider/post/three_params_config/set_project_new_process.html'
    # html = 'service_provider/post/three_params_config/report_confirm.html'

    # html = 'service_provider/post/four_params_config/set_service_provider.html'
    return render(request, html, results)


@csrf_exempt
def one_param(request, behavior):
    use_config = UseConfig()
    print 'behavior:', behavior

    if request.method == 'POST':

        print '开始保存 POST 信息'
        config = OneParamConfigPost
        behavior = behavior
        unhandled_request = request
        r = use_config.get(config, behavior, unhandled_request)

        message = 'one_param POST api, behavior: {}'.format(behavior)
        return JsonResponse(r)

    if request.method == 'GET':
        config = OneParamConfig
        behavior = behavior
        unhandled_request = request
        result = use_config.get(config, behavior, unhandled_request)
        return JsonResponse(result)

    html = 'service_provider/get/one_param_config/{}.html'.format(behavior)

    message = 'one_param api, behavior: {}'.format(behavior)

    # result['status_code'] = 200
    return HttpResponse(message)


@csrf_exempt
def two_params(request, the_id, behavior):
    use_config = UseConfig()
    print 'the_id:', the_id
    print 'behavior:', behavior

    if request.method == 'POST':

        print '开始保存 POST 信息'
        config = TwoParamsConfigPost
        behavior = behavior
        the_id = the_id
        unhandled_request = request
        r = use_config.get(config, behavior, the_id, unhandled_request)

        message = 'two_params POST api, behavior: {}'.format(behavior)
        return JsonResponse(r)

    if request.method == 'GET':

        config = TwoParamsConfig
        behavior = behavior
        the_id = the_id
        unhandled_request = request
        result = use_config.get(config, behavior, the_id, unhandled_request)
        return JsonResponse(result)

    html = 'service_provider/get/two_params_config/{}.html'.format(behavior)

    message = 'two_params api, behavior: {}'.format(behavior)
    return HttpResponse(message)


@csrf_exempt
def three_params(request, id_1, id_2, behavior):
    use_config = UseConfig()
    print 'id_1:', id_1
    print 'behavior:', behavior

    if request.method == 'POST':

        print '开始保存 POST 信息'
        config = ThreeParamsConfigPost
        behavior = behavior
        id_1 = id_1
        id_2 = id_2
        unhandled_request = request
        r = use_config.get(config, behavior, id_1, id_2, unhandled_request)

        message = 'three_params POST api, behavior: {}'.format(behavior)
        return HttpResponse(message)
        # return JsonResponse(r)

    if request.method == 'GET':
        config = ThreeParamsConfig
        behavior = behavior
        id_1 = id_1
        id_2 = id_2
        unhandled_request = request
        result = use_config.get(config, behavior, id_1, id_2, unhandled_request)
        return JsonResponse(result)

    html = 'service_provider/get/three_params_config/{}.html'.format(behavior)

    message = 'three_params api, behavior: {}'.format(behavior)
    return HttpResponse(message)


@csrf_exempt
def four_params(request, id_1, id_2, id_3, behavior):
    use_config = UseConfig()
    if request.method == 'POST':

        print '开始保存 POST 信息'
        config = FourParamsConfigPost
        behavior = behavior
        id_1 = id_1
        id_2 = id_2
        id_3 = id_3
        unhandled_request = request
        r = use_config.get(config, behavior, id_1, id_2, id_3, unhandled_request)

        message = 'four_params POST api, behavior: {}'.format(behavior)
        return HttpResponse(message)
        # return JsonResponse(r)

    # print 'id_1:', id_1
    # print 'behavior:', behavior

    # config = fourParamsConfig
    # behavior = behavior
    # id_1 = id_1
    # id_2 = id_2
    # result = use_config.get(config, behavior, id_1, id_2)

    # for i in result.keys():
    #     print '{}: {}'.format(i, result[i])

    # html = 'service_provider/get/four_params_config/{}.html'.format(behavior)

    message = 'three_params api, behavior: {}'.format(behavior)
    return HttpResponse(message)
    # return JsonResponse(result)
