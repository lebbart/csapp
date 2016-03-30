<?php
/**
 * @author : Lebart  <bogdan.lebedenko@gmail.com>
 * @copyright (c) 2014, Lebart
 *  */

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);

echo "Name : ".$data->name."n";
echo "Email : ".$data->email."n";
echo "Message : ".$data->message."n";