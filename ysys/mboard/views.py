# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render,HttpResponse
from django.http import HttpResponse,JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
def startindex(request):
    return render(request,"ysys/index.html",{})

def statictemplates(request,htmlfile):
    return render(request,'ysys/'+htmlfile,{})


@csrf_exempt
def add(request):
    if request.method == 'POST':
        print 'hello world'
    print(request.body)
    return HttpResponse('ok')