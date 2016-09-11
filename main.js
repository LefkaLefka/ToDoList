document.onclick = function(e)
{
	e = e || event;
	var target = e.target || e.srcElement;
		
	if (target.id === "btnAdd")
	{
		addNewRecord();
	}
	else
		if (target.ia === "btnDel")
		{
			deleteRecord();
		}
}

function addNewRecord()
{
	var newLi = document.createElement('li');
	newLi.innerHTML = 'Привет, мир!';

	list.appendChild(newLi);
}

function deleteRecord()
{
	$('li:even').remove();
}