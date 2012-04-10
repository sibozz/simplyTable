<?php
require_once 'conf_db.php';

gridData();

function gridData()
{
	$limit = 5;
	$sort = (isset($_POST['sort'])) ? $_POST['sort'] : 'id';
	$order = (isset($_POST['order'])) ? $_POST['order'] : 'asc';
	$page = (isset($_POST['page'])) ? $_POST['page'] : 1;
	$start = (isset($_POST['start'])) ? $_POST['start'] : 0;
	$search_key = (isset($_POST['search_key'])) ? $_POST['search_key'] : '';
	$search_val = (isset($_POST['search_val'])) ? $_POST['search_val'] : '';
		
	$sql  = "SELECT * FROM grid";
	if(!empty($search_key) and !empty($search_val))
		$sql .= " WHERE {$search_key}='{$search_val}'";
		
	if(!empty($sort) and !empty($order))
		$sql .= " ORDER BY {$sort} {$order}";
	$sql .= " LIMIT {$start},{$limit}";
	
	$query = mysql_query($sql);
	$data = array();
	if (mysql_num_rows($query) > 0) {
		
		while ($rows = mysql_fetch_assoc($query)) {
			$data[] = $rows;
		}
	}
	
	$sqlTotal = "SELECT COUNT(*) FROM grid";
	$total = mysql_fetch_row(mysql_query($sqlTotal));
	
	$pagination = array('page'=>$page,'total'=>$total[0],'limit'=>$limit);
	if($_POST)
	{
		if($data)
			$out = json_encode(array('data'=> $data,'sort'=> $sort,'order'=> $order,'pagination'=> $pagination));
		else
			$out = json_encode(array('data'	=> ''));
		die($out);
	}
}

include("view.php");
