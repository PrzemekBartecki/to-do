document.addEventListener("DOMContentLoaded", function () {

	var btnAdd = document.querySelector('.btn.add');
	var btnDel = document.querySelector('.btn.delete');
	var btnCl = document.querySelector('.btn.clear');
	var counter = 1;

	btnAdd.addEventListener('click', function () {

		var task = document.querySelector('input');
		var ul = document.querySelector('ul');
		var li = document.createElement('li');

		if (task.value.trim() === '') {
			var emptyTxt = task.value.replace(/\s/g, '')
			task.value = emptyTxt;
			task.placeholder = 'write a task';
			return
		} else {
			task.placeholder = 'to do ...';
		}

		li.innerText = task.value + ' task-number-' + counter++;
		ul.appendChild(li);
		task.value = '';
	});

	btnDel.addEventListener('click', function () {

		var lastTask = document.querySelector('ul li:last-child')
		lastTask.parentElement.removeChild(lastTask);
		counter--
	});

	btnCl.addEventListener('click', function () {

		var taskList = document.querySelectorAll('ul li')

		for (let i = 0; i < taskList.length; i++) {
			taskList[i].parentNode.removeChild(taskList[i]);
		}

		counter = 1;
	});


});