<?php
/*
Site : http:www.smarttutorials.net
Author :muni
*/
require_once '../includes/config.php';

if( isset($_POST['type']) && !empty( isset($_POST['type']) ) ){
	$type = $_POST['type'];

	switch ($type) {
		case "save_pStar":
			save_pStar($mysqli);
			break;
		case "delete_pStar":
			delete_pStar($mysqli, $_POST['id']);
			break;
		case "getUsers":
			getUsers($mysqli);
			break;
		default:
			invalidRequest();
	}
}else{
	invalidRequest();
}

/**
 * This function will handle user add, update functionality
 * @throws Exception
 */
function save_pStar($mysqli){
	try{
		$data = array();
		$stageName = $mysqli->real_escape_string(isset( $_POST['pStar']['stageName'] ) ? $_POST['pStar']['stageName'] : '');
		$scoreImageUrl = $mysqli->real_escape_string(isset( $_POST['pStar']['scoreImageUrl'] ) ? $_POST['pStar']['scoreImageUrl'] : '');
		$pStarVotes = $mysqli->real_escape_string(isset( $_POST['pStar']['pStarVotes'] ) ? $_POST['pStar']['pStarVotes'] : '');
		$id = $mysqli->real_escape_string( isset( $_POST['pStar']['id'] ) ? $_POST['pStar']['id'] : '');

		if($stageName == '' || $scoreImageUrl == '' ){
			throw new Exception( "Required fields missing, Please enter and submit" );
		}


		if(empty($id)){
			$query = "INSERT INTO pStarsTable ( `stageName`,`scoreImageUrl`, `pStarVotes`) VALUES ( '$stageName', '$scoreImageUrl', 0)";
		}else{
			$query = "UPDATE pStarsTable SET `stageName` = '$stageName',`scoreImageUrl` = '$scoreImageUrl', `pStarVotes` = $pStarVotes WHERE `pStarsTable`.`id` = $id";
			//echo $query;
		}

		if( $mysqli->query( $query ) ){
			$data['success'] = true;
			if(!empty($id))$data['message'] = 'User updated successfully.';
			else $data['message'] = 'User inserted successfully.';
			if(empty($id))$data['id'] = (int) $mysqli->insert_id;
			else $data['id'] = (int) $id;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

/**
 * This function will handle user deletion
 * @param string $id
 * @throws Exception
 */
function delete_pStar($mysqli, $id = ''){
	try{
		if(empty($id)) throw new Exception( "Invalid User." );
		$query = "DELETE FROM `pStarsTable` WHERE `id` = $id";
		if($mysqli->query( $query )){
			$data['success'] = true;
			$data['message'] = 'User deleted successfully.';
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}


	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

/**
 * This function gets list of users from database
 */
function getUsers($mysqli){
	try{

		$query = "SELECT * FROM `pStarsTable` order by id desc limit 8";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$row['id'] = (int) $row['id'];
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;

	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}




function invalidRequest()
{
	$data = array();
	$data['success'] = false;
	$data['message'] = "Invalid request.";
	echo json_encode($data);
	exit;
}
