$(document).ready(function() {

	var popup_window_first = $('.popup_window_first')[0];

	var popup_window_second = $('.popup_window_second')[0];

	var popup_window_third = $('.popup_window_third')[0];;

	$('#first_popup_call').click(function() {

		$(popup_window_first).show();
	});

	$('.popup_window_first .popup_close').click(function() {

		$(popup_window_first).hide();
	});

	$('#second_popup_call').click(function() {

		$(popup_window_second).show();
	});

	$('.popup_window_second .popup_close').click(function() {

		$(popup_window_second).hide();
	});

	$('#third_popup_call').click(function() {

		$(popup_window_third).show();
	});

	$('.popup_window_third .popup_close').click(function() {

		$(popup_window_third).hide();
	});
});