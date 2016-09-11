//обЪект сохраняет статус записи и ее текст
var record = new Object(statusRecord = null, textRecord = null);
//создаем массив из обктов записей
var arrayRecord = Array();

//назначаем функций обработчика событий
window.onload = function()
{
	document.getElementById("inputFormNewRecord").addEventListener("keypress", AddNewRecordToArray);
	
//	document.getElementById("checkboxExpandTurnRecords").addEventListener("click", ExpandTurnRecords);
	
}

//добавляем новое значение в массив записей
function AddNewRecordToArray()
{
	var e = e || window.event;
	//добавляем по событию нажатия кнопки "Enter"
	if (e.keyCode === 13)
	{
		//проверяем входящу строку
		var str = document.getElementById("inputFormNewRecord").value;
		if (str !== "")
		{
			//добавление
			record.statusRecord = false;
			record.textRecord = str;
			arrayRecord[arrayRecord.length] = record;
			//обновляем входищий "input"
			document.getElementById("inputFormNewRecord").value = "";
			ModelingStrLiElement(arrayRecord.length - 1);
		}
	}
}

//обновление списка всех записей на экране
function UpdateDataList()
{
	for (var i = 0; i < arrayRecord.length; ++i)
	{
		
	}
}

//формируем строку которая будет содеражть все внутренные элементы <li>
//принимает порядковый номер записи в массиве для id
function ModelingStrLiElement(num)
{
	var newList = document.createElement("li");
	newList.className = "record";
	newList.id = num;
	listElement.appendChild(newList);
	
	document.getElementById(num).innerHTML = ModelingStrCheckboxDone(num) + ModelingStrDivText(num) + ModelingStrButtonDeleteDivSpan(num);
}

//формируем html-теги для checkbox-а
function ModelingStrCheckboxDone(num)
{
	var str = "<input class=\"checkboxDone\"" + "id=" + num + ".1\" " + "type=\"checkbox\"\>";
	return str;
}

//формируем html-теги для div-а с текстом записи
function ModelingStrDivText(num)
{
	var str = "<div class=\"text\" " + "id=" + num + ".2\"> " + arrayRecord[num].textRecord + "</div>";
	return str;
}

//формируем html-теги для div-а с кнопкой удаления записи
function ModelingStrButtonDeleteDivSpan(num)
{
	var str = "<div class=\"buttonDelete\" " + "id=" + num + ".3\" " + "onselectstart=\"return false\" onmousedown=\"return false\"><span class=\"buttonDeleteText\"" + "id=" + num + ".3.1\" "  + ">X</span></div>";
	return str;
}
//
//document.onclick = function(e)
//{
//	e = e || event;
//	var target = e.target || e.srcElement;
//	
////	console.log(target.id);
//}