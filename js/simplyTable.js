/*
 * simplyTable
 * (http://www.mawaddirachman.com)
 * Copyright (c) 2012 Mawaddi Rachman <mawaddi.rachman@gmail.com>
 * $Version: 10/01/2012
 */

(function( $ ){
  $.fn.simplyTable = function(obj) {

	var column = obj.column;
	var fields = obj.fields;
	var primID = obj.primID;
	var url = obj.url;
	var position = obj.position;
	var tbwidth = '100%';
	var tbheight = '100%';
	var rowWidth = obj.rowWidth;
	var params = '';
	var afterSubmit = obj.afterSubmit;
	var colOrder = '';
	var colSort = '';
	var pagination = obj.pagination;
	
	if(typeof obj.params != 'undefined')
		params = obj.params;
	else
		params = {primID:''};
	
	var divElement = this;
	
	function buildTable(_paramsNew)
	{
		if(typeof _paramsNew!= 'undefined')
		{
			params = _paramsNew;
		}
		$.post(url,params,function(res){
			
			if(typeof obj.width != 'undefined')
				tbwidth=obj.width;
			if(typeof obj.height != 'undefined')
				tbheight=obj.height;
				
			var html_table = '<div class="round" style="margin-top:10px;">';
			html_table += '<table class="table_content" cellspacing="0" style="width:'+tbwidth+';height:'+tbheight+';">';
			var total_column = column.length;
			
			// create th column
			html_table += '<tr>';
			var icoArrow = '';
			var attrSort = '';
			$.each(column,function(i,n){
				if(typeof rowWidth[i]!='undefined')
				{
					if (rowWidth[i] > 0)
						wdt = 'width:'+rowWidth[i]+'px;';
					else
						wdt = '';
				}else wdt ='';
				
				colOrder = res.order;
				colSort = res.sort;
				if((colOrder!=null) && (colSort!=null))
				{
					if(colSort == fields[i])
					{
						if(colOrder=='asc')
						{
							attrSort = fields[i]+'-desc';
							icoArrow = '<span class="spanDesc" id="arrow">&nbsp;</span>';
						}
						else
						{
							attrSort = fields[i]+'-asc';
							icoArrow = '<span class="spanAsc" id="arrow">&nbsp;</span>';
						}
					}
					else
					{
						icoArrow = '';
						attrSort = fields[i]+'-asc';
					}
				}
				else
				{
					if(primID == fields[i])
					{
						if(colOrder=='asc')
						{
							attrSort = fields[i]+'-desc';
							icoArrow = '<span class="spanDesc" id="arrow">&nbsp;</span>'
						}
						else
						{
							attrSort = fields[i]+'-asc';
							icoArrow = '<span class="spanAsc" id="arrow">&nbsp;</span>';;
						}
					}
					else
					{
						icoArrow = '';
						attrSort = fields[i]+'-asc';
					}
				}
				if(i==0)
					html_table += '<th class="left sort-simply" style="'+wdt+'cursor:pointer;" sort="'+attrSort+'">'+n+icoArrow+'</th>';
				else{
					if(i!=total_column)
						html_table += '<th class="center sort-simply" style="'+wdt+'cursor:pointer;" sort="'+attrSort+'">'+n+icoArrow+'</th>';
					else
						html_table += '<th class="right sort-simply" style="'+wdt+'cursor:pointer;" sort="'+attrSort+'">'+n+icoArrow+'</th>';
				}
			});
			html_table += '</tr>';
			if (res.data == 'null' || res.data.length==0) {
				//return false;
				html_table +='<tr><td class="left ganjil" colspan="'+total_column+'" style="border-right:1px solid #B484C1;">No data</tr>';
			}
			else
			{
				// create row data
				$.each(res.data,function(i,n){
					html_table += '<tr id="tr_'+n[primID]+'">';
					var total_fields = fields.length -1;
					$.each(fields,function(l,m){
						wdt = '';
						
						if(i%2 != 0)
						{
							if(total_fields!=l)
								html_table += '<td class="left ganjil" style="'+wdt+'text-align:'+position[l]+';">'+n[m]+'</td>';
							else
								html_table += '<td class="right ganjil" style="'+wdt+'text-align:'+position[l]+';">'+n[m]+'</td>';
						}
						else
						{
							if(total_fields!=l)
								html_table += '<td class="left genap" style="'+wdt+'text-align:'+position[l]+';">'+n[m]+'</td>';
							else
								html_table += '<td class="right genap" style="'+wdt+'text-align:'+position[l]+';">'+n[m]+'</td>';
						}
					});
					html_table += '</tr>';
				});
				html_table += '<tbody class="moreRow" style="display:none;"></tbody>';
				
				//pagination
				if(isValidObject(pagination) && pagination!='')
				{
					var current_page = res.pagination.page;
					var limit = res.pagination.limit;
					var total_page = Math.ceil(res.pagination.total / limit);
					var start_from = '';
					
					var pageRow = '<div id="pagination" style="text-align:center;">';
					pageRow += '<input type="hidden" name="page" value="'+current_page+'">';
					pageRow += '<input type="hidden" name="total_page" value="'+total_page+'">';
					pageRow += '<input type="hidden" name="page_limit" value="'+limit+'">';
					
					if(typeof obj.search!= 'undefined')
						pageRow += '<span class="spanSearch" id="simply-search" style="cursor:pointer;float:left;">&nbsp;</span>';
					
					if(current_page > 1 )
					{
						var start_from = 0;
						var page = 1;
						pageRow += '<span class="simply-pagination spanFirst" page="'+page+'" limit="'+limit+'" start="'+start_from+'" style="cursor:pointer;">&nbsp;</span>';
						
						var start_from = (current_page * limit) - limit;
						var page = parseInt(current_page) - 1;
						pageRow += '<span class="simply-pagination spanPrev" page="'+page+'" limit="'+limit+'" start="'+start_from+'" style="cursor:pointer;">&nbsp;</span>&nbsp;';
					}
					pageRow += 'Page <input type="text" size="1" style="text-align:center" disabled="disabled" name="page_current" id="page_current" value="'+current_page+'" onkeypress="handleEnter(this, event)" /> &nbsp;&nbsp; of '+total_page+' &nbsp; ';

					if(current_page >= 1 && current_page < total_page)
					{
						var start_from = (current_page * limit);
						var page = parseInt(current_page)+1;
						pageRow += '<span class="simply-pagination spanNext" page="'+page+'" style="cursor:pointer;" limit="'+limit+'" start="'+start_from+'" title="next">&nbsp;</span>&nbsp;';
					}
					if(current_page!=total_page)
					{
						var start_from = (total_page * limit) - limit;
						var page = total_page;
						pageRow += '<span  class="simply-pagination spanLast" page="'+page+'" style="cursor:pointer;" limit="'+limit+'" start="'+start_from+'" title="last">&nbsp;</span>';
					}
					pageRow += '</div>';
					
					html_table += '<tr id="trPaging"><td colspan="'+total_column+'" align="center" class="paging">'+pageRow+'</td></tr>';
				}
			
				if((typeof res.more_column!='undefined') && res.more_column.length != 0)
				{
					html_table += '<tr><td colspan="'+total_column+'" align="center" class="paging">'+res.more_column+'</td></tr>';
				}
				
				html_table += '</table></div>';
			}
			
			divElement.html(html_table);
			
			if(afterSubmit)
				eval(afterSubmit)
				
			$('.sort-simply').click(function(){
				var ele = $(this).attr('sort').split('-');
				
				params.sort = ele[0];
				params.order = ele[1];
				divElement.trigger('reloadGrid');
				
				$('#arrow').remove();
			});
			$('.simply-pagination').click(function(){
				var start_from = $(this).attr('start');
				var limit = $(this).attr('limit');
				var page = $(this).attr('page');
				
				params.start = start_from;
				params.limit = limit;
				params.page = page;
				divElement.trigger('reloadGrid');
			});
			$('#simply-search').click(function(){
				var simplySearch = '<select name="search_key">';
				$.each(column,function(i,n){
					simplySearch += '<option value="'+fields[i]+'">'+n+'</option>';
				});
				simplySearch += '</select>';
				simplySearch += '<input name="search_val" type="text" size="12"/>';
				simplySearch += '<input id="simply-go" type="button" value="go" size="3" />';
				
				var moreRow = '<tr><td colspan="'+total_column+'" class="paging">'+simplySearch+'</td></tr>';
				$('.moreRow').html(moreRow);
				if($('.moreRow').is(":visible")==false)
					$('.moreRow').show();
				else
					$('.moreRow').hide();
			
				$('#simply-go').click(function(){
					params.search_key = $('select[name=search_key]').val();
					params.search_val = $('input[name=search_val]').val();
					divElement.trigger('reloadGrid');
				});
			});
		},'json');
	}
	
	function isValidObject(objToCheck) {
	  if (null == objToCheck) return false;
	  if ("undefined" == typeof(objToCheck)) return false;
	  return true;
	}
	
	buildTable(params);
	this.bind("reloadGrid",function(event,paramsNew){
		buildTable(paramsNew);
	});
	
  };
  
})( jQuery );

