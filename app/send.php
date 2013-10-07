<?php

$emailRegexp = "/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])↪*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/";

header('Content-type', 'application/json');

if ( ! empty($_POST)) {
	if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])
		&& $_POST['name'] != '' && $_POST['email'] != '' && $_POST['message'] != '') {
		$name = htmlentities($_POST['name']);
		$email = $_POST['email'];
		$message = htmlentities($_POST['message']);

		

		$headers = "From: <$email>". PHP_EOL;
		$headers.= "X-Mailer: PHP {phpversion()}". PHP_EOL;
		$headers.= "Reply-to: <$email>";

		if ( mail(MAIL_TO, 'New message from leohetsch.com contact form', nl2br($message), $headers) ) {
			echo json_encode(array(
				'code' => '0'
			));
		} else {
			echo json_encode(array(
				'code' => '1',
				'error'	=> 'sending'
			));
		}


	} else {
		echo json_encode(array(
			'code' => '1',
			'error' => 'blank',
		));
	}
} else {
	echo json_encode(array(
			'code' => '1',
			'error' => 'blank',
		));
}