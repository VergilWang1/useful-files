	// callBackOne();
	function callBackOne(){
		$(".box").fadeIn(500,function(){
			$(".first_bg").fadeIn(500,function(){
				$(".box>.qiqiu1").fadeIn().addClass("sportLeft");
				$(".box>.qiqiu2").fadeIn().addClass("sportRight");
				$(".first1").fadeIn(500,function(){
					$(".first2").fadeIn(500,function(){
						$(".first3").fadeIn(1000,function(){
							setTimeout(function(){
								$(".box").fadeOut(700,callBackTwo);
							},4000);
						});
					});
				});
			});
		});
	}
	// callBackTwo()
	function callBackTwo(){
		$(".box1").fadeIn(500,function(){
			$(".box1>.img1").fadeIn(500,function(){
				$(".box1>.img2").fadeIn(500,function(){
					$(".box1>.img3").fadeIn(500,function(){
						$(".box1>.img4").fadeIn(500,function(){
							$(".box1>.img5").fadeIn(500,function(){
								setTimeout(function(){
									$(".box1").fadeOut(500,callBackThree);
								},2000);
							});
						});
					})
				});
			});
		});
	}
	// callBackThree()
	function callBackThree(){
		$(".shopping").fadeIn(500,function(){
			$(".shoppingLogo").fadeIn(500,function(){
				$(".shopping_bg").fadeIn(500,function(){
					$(".music").fadeIn(100,function(){
						$(".shopping_car").fadeIn(100);
						var i = 1;
						setInterval(function(){
							if(i == 4){
								$(".shopping_car").addClass("rot");
							}else if(i >= 7){
								$(".shopping_car").removeClass("rot");
								i = 1;
							}
							$(".music").attr("src","images/goshopping/music"+Math.ceil(i/2)+".png");
							i++;
						},400);
					});
					$(".shopping1").fadeIn(500,function(){
						$(".shopping2").fadeIn(500,function(){
							$(".shopping3").fadeIn(500,function(){
								$(".shopping4").fadeIn(500,function(){
									$(".shopping5").fadeIn(500,function(){
										$(".people1").fadeIn(1500,function(){
											$(".people2").fadeIn(700,function(){
												$(".people3").fadeIn(700,function(){
													$(".people4").fadeIn(700,function(){
														$(".people6").fadeIn(700,function(){
															$(".people5").fadeIn(700,function(){
																$(".people5").fadeOut(100,function(){
																	$(".people5").fadeIn(500,function(){
																		$(".people1").fadeOut(100,function(){
																			$(".people1").fadeIn(500,function(){
																				$(".people2").fadeOut(100,function(){
																					$(".people2").fadeIn(500,function(){
																						$(".people4").fadeOut(100,function(){
																							$(".people4").fadeIn(500,function(){
																								$(".people6").fadeOut(100,function(){
																									$(".people6").fadeIn(500).addClass("moveNext3");
																								});
																							}).addClass("moveNext2");
																						});
																					}).addClass("moveNext");
																				});
																			}).addClass("moveNext");
																		});
																	}).addClass("moveNext");
																	setTimeout(function(){
																		$(".shopping").fadeOut(700,callBackFour);
																	},4000);
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						})
					});
				});
			});
		});
	}
	// callBackFour()
	function callBackFour(){
		$(".four").fadeIn(500, function(){
			$(".four>.img1").fadeIn(500,function(){
				$(".four>.img2").fadeIn(700,function(){
					$(".four>.img3").fadeIn(700,function(){
						setTimeout(function(){
							$(".four").fadeOut(700,callBackFive);
						},2000);
					}).addClass("blinkSlow");
				});
			});
		});
	}
	// callBackFive()
	function callBackFive(){
		$(".box2").fadeIn(500,function(){
			$(".box2>.img1").fadeIn(500,function(){
				$(".box2>.img2").fadeIn(500,function(){
					$(".box2>.img3").fadeIn(500,function(){
						$(".box2>.img4").fadeIn(500,function(){
							$(".box2>.img5").fadeIn(500,function(){
								setTimeout(function(){
									$(".box2").fadeOut(700,callBackSix);
								},2000);
							});
						});
					})
				});
			});
		});
	}
	// callBackSix()
	function callBackSix(){
		$(".vip-marketing").fadeIn(500,function(){
			$(".vip_bg").fadeIn(1000,function(){
				$(".vip1").fadeIn(1000,function(){
					$(".vip2-1").fadeIn(1000,function(){
						$(".vip2-2").fadeIn(500,function(){
							$(".vip_line").fadeIn(1000,function(){
								$(".vip_line").fadeOut(100);
								$(".vip3").fadeIn(100,function(){
									setTimeout(function(){
										$(".vip3").fadeOut(700);
										$(".vip2-1").fadeOut(500);
										$(".vip2-2").fadeOut(500,function(){
											$(".c1").fadeIn(100).addClass("blink2");
											$(".vip_saying1").fadeIn(2500, function(){
												$(".vip_saying2").fadeIn(1500, function(){
													$(".c2").fadeIn(100).addClass("blink2");
													$(".vip_saying3").fadeIn(700, function(){
														$(".c3").fadeIn(100).addClass("blink2");
														$(".vip_saying4").fadeIn(1500, function(){
															$(".c4").fadeIn(100).addClass("blink2");
															$(".vip_saying5").fadeIn(1500,function(){
																$(".c5").fadeIn(100).addClass("blink2");
																$(".vip_saying6").fadeIn(1500,function(){
																	setTimeout(function(){
																		$(".vip-marketing").fadeOut(700,callBackSeven);
																	},4000);
																});
															});
														});
													});
												}).addClass("blink2");
											});
										});
									},3000);
								});
							}).addClass("lineSao");
						});
					});
				});
			});
		});
	}

	function callBackSeven(){
		$(".box3").fadeIn(500,function(){
			$(".box3>.img1").fadeIn(500,function(){
				$(".box3>.img2").fadeIn(500,function(){
					$(".box3>.img3").fadeIn(500,function(){
						$(".box3>.img4").fadeIn(500,function(){
							$(".box3>.img5").fadeIn(500,function(){
								setTimeout(function(){
									$(".box3").fadeOut(700,callBackEight);
								},1000);
							});
						});
					})
				});
			});
		});
	}
	// callBackEight()
	function callBackEight(){
		$(".xuanchuan").fadeIn(500,function(){
			$(".xuanchuan_bg").fadeIn(1000,function(){
				$(".xuanchuan_logo").fadeIn(1000,function(){
					$(".xuanchuan1").fadeIn(1000,function(){
						$(".xuanchuan2").fadeIn(200,function(){
							$(".xuanchuan3").fadeIn(1000,function(){
								$(".xuanchuan4").fadeIn(200,function(){
									$(".xuanchuan5").fadeIn(1000,function(){
										$(".xuanchuan1").addClass("scaleNxiaoshi").fadeOut(1000);
										$(".xuanchuan2").fadeOut(700);
										$(".xuanchuan3").fadeOut(700);
										$(".xuanchuan4").fadeOut(700);
										$(".xuanchuan5").fadeOut(700);
										$(".xuanchuan6").fadeIn(500,function(){
											$(".xuanchuan_car").fadeIn(100);
											var fleg = 0;
											setInterval(function(){
												if(fleg == 0){
													$(".xuanchuan_car").addClass("rot");
													fleg = 1;
												}else{
													$(".xuanchuan_car").removeClass("rot");
													fleg = 0;
												}
											},500);
											$(".circle1").fadeIn(100).addClass("blink2");
											$(".xuanchuan7").fadeIn(2000,function(){
												$(".circle2").fadeIn(100).addClass("blink2");
												$(".xuanchuan8").fadeIn(1000,function(){
													setTimeout(function(){
														$(".xuanchuan").fadeOut(700,callBackNine);
													},4000);
												});
											});
										});
									});
								});
							});
						})
					});
				});
			});
		});
	}

	function callBackNine(){
		$(".box4").fadeIn(500,function(){
			$(".box4>.img1").fadeIn(500,function(){
				$(".box4>.img2").fadeIn(500,function(){
					$(".box4>.img3").fadeIn(500,function(){
						$(".box4>.img4").fadeIn(500,function(){
							$(".box4>.img5").fadeIn(500,function(){
								setTimeout(function(){
									$(".box4").fadeOut(700,callBackTen);
								},1000);
							});
						});
					})
				});
			});
		});
	}
	// callBackTen()
	function callBackTen(){
		$(".cakeShop").fadeIn(500,function(){
			$(".cakeShop_bg").fadeIn(500,function(){
				$(".cakeShop1").fadeIn(1000,function(){
					$(".cakeShop2").fadeIn(1000,function(){
						$(".cakeShop3").fadeIn(1000,function(){
							$(".cakeShop4").fadeIn(100,function(){
								$(".cakeShop5").fadeIn(700,function(){
									$(".cakeShop6").fadeIn(100,function(){
										$(".cakeShop7").fadeIn(700,function(){
											$(".cakeShop8").fadeIn(100,function(){
												$(".cakeShop9").fadeIn(700,function(){
													$(".cakeShop10").fadeIn(100,function(){
														$(".cakeShop11").fadeIn(700,function(){
															$(".cakeShop12").fadeIn(100,function(){
																$(".cakeShop13").fadeIn(700,function(){
																	setTimeout(function(){
																		$(".cakeShop").fadeOut(700,callBackEleven);
																	},3000);
																});
															}).addClass("blink2");
														});
													}).addClass("blink2");
												});
											}).addClass("blink2");
										});
									}).addClass("blink2");
								});
							}).addClass("blink2");
						});
					});
				});
			});
		});
	}

	function callBackEleven(){
		$(".box5").fadeIn(500,function(){
			$(".box5>.img1").fadeIn(500,function(){
				$(".box5>.img2").fadeIn(500,function(){
					$(".box5>.img3").fadeIn(500,function(){
						$(".box5>.img4").fadeIn(500,function(){
							$(".box5>.img5").fadeIn(500,function(){
								setTimeout(function(){
									$(".box5").fadeOut(700,callBackTwelve);
								},1000);
							});
						});
					})
				});
			});
		});
	}
	// callBackTwelve()
	function callBackTwelve(){
		$(".find_Child").fadeIn(500,function(){
			$(".find_bg").fadeIn(700,function(){
				$(".find1").fadeIn(700,function(){
					$(".find2").fadeIn(700,function(){
						$(".find_dian").fadeIn(300).addClass("blink2");
						$(".find3").fadeIn(700,function(){
							$(".find4").fadeIn(700,function(){
								$(".find5").fadeIn(700,function(){
									$(".find6").fadeIn(700,function(){
										$(".find7").fadeIn(700,function(){
											$(".find8").fadeIn(700,function(){
												$(".find9").fadeIn(700,function(){
													$(".find10").fadeIn(700,function(){
														$(".find11").fadeIn(700,function(){
															$(".find12").fadeIn(100,function(){
																$(".find13").fadeIn(100,function(){
																	$(".find14").fadeIn(1000,function(){
																		setTimeout(function(){
																			$(".find_Child").fadeOut(700,callBackThirteen);
																		},3000);
																	});
																}).addClass("blink2");
															});
														});
													});
												}).addClass("blinkAll");
											});
										});
									});
								});
							});
						}).addClass("blinkAll");
					});
				});
			});
		});
	}
	// callBackThirteen()
	function callBackThirteen(){
		$(".finded_Child").fadeIn(500,function(){
			$(".finded0").fadeIn(500,function(){
				$(".finded1").fadeIn(500,function(){
					$(".finded2").fadeIn(500,function(){
						$(".finded3").fadeIn(500,function(){
							$(".dian").fadeIn(100).addClass("blink2");
							$(".finded4").fadeIn(500,function() {
								$(".finded5").fadeIn(500,function(){
									setTimeout(function(){
										$(".finded_Child").fadeOut(700,callBackFourteen);
									},2000)
								});
							});
						}).addClass("blink2");
					});
				});
			});
		});
	}
	// callBackFourteen()
	function callBackFourteen(){
		$(".parking").fadeIn(500,function(){
			$(".parking_bg").fadeIn(700,function(){
				$(".parking1").fadeIn(700,function(){
					$(".parking2").fadeIn(700,function(){
						$(".talkQuan1").fadeIn(10).addClass("blink2");
						$(".man01").fadeIn(700,function(){
							$(".dian01").fadeIn(700,function(){
								$(".talk01").fadeIn(700,function(){
									$(".phone1").fadeIn(1000,function(){
										$(".phone2").fadeIn(500,function(){
											$(".phone3").fadeIn(500,function(){
												$(".phone4").fadeIn(500,function(){
													$(".phone5").fadeIn(10,function(){
														setTimeout(function(){
															$(".man01").fadeOut(100);
															$(".dian01").fadeOut(100);
															$(".talk01").fadeOut(100);
															$(".phone1").fadeOut(100);
															$(".phone2").fadeOut(100);
															$(".phone3").fadeOut(100);
															$(".phone4").fadeOut(100);
															$(".phone5").fadeOut(100,function(){
																$(".tiepian").fadeIn(100).addClass("blink2");
																$(".man02").fadeIn(1500,function(){
																	$(".dian02").fadeIn(10,function(){
																		$(".talk02").fadeIn(700,function(){
																			setTimeout(function(){
																				$(".parking").fadeOut(500,callBackLast);
																			},3000);
																		});
																	}).addClass("blink2");
																});
															});
														},2000);
													}).addClass("blink2");
												});
											});
										});
									});
								})
							}).addClass("blink2");
						})
					});
				});
			});
		});
	}

	function callBackLast(){
		$(".last").fadeIn(500,function(){
			$(".last1").fadeIn(500,function(){
				$(".last>.qiqiu1").fadeIn().addClass("sportLeft");
				$(".last>.qiqiu2").fadeIn().addClass("sportRight");
				$(".last2").fadeIn(500,function(){
					$(".last3").fadeIn(500,function(){
						$(".last4").fadeIn(500,function(){
							$(".last5").fadeIn(500,function(){
								setTimeout(function(){
									$(".last").fadeOut(500,function(){
										history.go(0);
									});
								},4000);
							});
						});
					})
				});
			});
		});
	}

	
	
	
	
	
	
