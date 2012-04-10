$(function(){
	$('#dataTabel').simplyTable({
		url : document.location,
		column :["ID", "Nama","Email","Alamat"],
		fields : ["id","nama","email","alamat"],
		rowWidth : [5,20,20,20],
		position : ["center","left","left","center"],
		primID : "id",
		pagination : true,
		search : true,
		params : {
			'limit': 10,
			'page': 1,
			'start': 0
		}
	});
	
})
