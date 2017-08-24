pageOne()
function pageOne(){
    $(".page1").fadeIn(500,function(){
        $(".page1-bg").fadeIn(500);
        $(".page1-car1").fadeIn(500).addClass("sportX2");
        $(".page1-car2").fadeIn(500).addClass("sportX1");
        $(".page1-yun1").fadeIn(500).addClass("sportX1");
        $(".page1-yun4").fadeIn(500).addClass("sportX2");
        $(".page1-yun5").fadeIn(500,function(){
            $(".page1-logo").fadeIn(500,function(){
                $(".page1-yun2").fadeIn(1500);
                $(".page1-yun3").fadeIn(1500,function(){
                    $(".page1-people").fadeIn(500,function(){
                        setTimeout(function(){
                            $(".page1").fadeOut(500,pageTwo);
                        },2200);
                    });
                });
            })
        });
    });
}

// pageTwo()
function pageTwo(){
    $(".page2").fadeIn(500,function(){
        $(".page2-bg").fadeIn(500);
        $(".page2-ring").fadeIn(500,function(){
            $(".page2-1").fadeIn(1000,function(){
                $(".page2-2").fadeIn(1000,function(){
                    $(".page2-3").fadeIn(1000,function(){
                        $(".page2-4").fadeIn(1000,function(){
                            $(".page2-5").fadeIn(1000,function(){
                                $(".page2-6").fadeIn(1000,function(){
                                    $(".page2-7").fadeIn(1000,function(){
                                        $(".page2-8").fadeIn(1000,function(){
                                            $(".page2-9").fadeIn(1000,function(){
                                                $(".page2-ring").addClass("blink2");
                                                $(".page2-10").fadeIn(1000,function(){
                                                    $(".page2-11").fadeIn(1000,function(){
                                                        $(".page2-12").fadeIn(1000,function(){
                                                            $(".page2-13").fadeIn(1000,function(){
                                                                $(".page2-14").fadeIn(1000,function(){
                                                                    $(".page2-15").fadeIn(1000,function(){
                                                                        $(".page2-16").fadeIn(1000,function(){
                                                                            $(".page2-17").fadeIn(1000,function(){
                                                                                $(".page2-18").fadeIn(1000,function(){
                                                                                    $(".page2-19").fadeIn(1000,function(){
                                                                                        $(".page2-20").fadeIn(1000,function(){
                                                                                            setTimeout(function(){
                                                                                                $(".page2").fadeOut(500);
                                                                                            },2000);
                                                                                        });
                                                                                    });
                                                                                }).addClass("blink2");
                                                                            });
                                                                        });
                                                                    });
                                                                }).addClass("blink2");
                                                            });
                                                        });
                                                    });
                                                }).addClass("blink2");
                                            });
                                        });
                                    });
                                }).addClass("blink2");
                            });
                        });
                    }).addClass("blink2");
                }).addClass("blink2");
            }).addClass("blink2");
        });
    });
}

function pageThree(){
    $(".page3").fadeIn(500,function(){

    });
}

function pageFour(){
    $(".page4").fadeIn(500,function(){

    });
}

function pageFive(){
    $(".page5").fadeIn(500,function(){

    });
}

function pageSix(){
    $(".page6").fadeIn(500,function(){

    });
}

function pageSeven(){
    $(".page7").fadeIn(500,function(){

    });
}

function pageEight(){
    $(".page8").fadeIn(500,function(){

    });
}

function pageNine(){
    $(".page9").fadeIn(500,function(){

    });
}

function pageTen(){
    $(".page10").fadeIn(500,function(){

    });
}

function pageEleven(){
    $(".page11").fadeIn(500,function(){

    });
}

function pageTwelve(){
    $(".page12").fadeIn(500,function(){

    });
}

function pageThirteen(){
    $(".page13").fadeIn(500,function(){

    });
}

function pageFourteen(){
    $(".page14").fadeIn(500,function(){

    });
}