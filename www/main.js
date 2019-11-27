//Retrieve all the data from repository.
const fetchData = async ()=>{
	
	const url = 'http://'+webConfig.ip+':'+webConfig.port+'/report';

	const result = await fetch(url,{
		method: 'GET',
	 	headers:{
		 'Content-Type':'application/json'
	 	}
	});

	return await result.json();

};

//Render html tables.
const fillTable = (result)=>{

	result.forEach((project)=>{

		if (project&&project.success&&project.body){

			const {
				name
			} = project.body;

			const {
				versions
			} = project.body;

			//Set version.
			let envHtml = '';

			versions.forEach(obj=>{
				envHtml += (obj&&obj.content)?'<td class="column">'+obj.content+'</td>':'<td class="column" style="color:#FF2626;font-weight:bold;">X</td>';
			});					

			//Set item.
			const html = '<tr>'+
				'<td class="column column1 column-name">'+name+'</td>'+
				envHtml
			'</tr>';

			$('#table_body').append(html);

		}

	});

}

//When the page is loaded.
$(document).ready(()=>{

	//Hide on load.
	$("#loading-body").show();
	$("#data-table").hide();

	//When the data finish, change divs.
	fetchData().then(result=>{
		
		if (result&&result.length>0){

			$("#loading-body").hide();
			$("#data-table").show();

			fillTable(result);		

		}

	});

});
