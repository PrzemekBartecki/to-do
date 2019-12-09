document.addEventListener("DOMContentLoaded", function () {

	const removeLastTask = 1900;
	const btnAdd = document.querySelector('.btn.add');
	const btnDel = document.querySelector('.btn.delete');
	const btnCl = document.querySelector('.btn.clear');
	const ul = document.querySelector('ul');
	let task = document.querySelector('input');
	let counter = 1;
	let $ul = $('ul');

	let liMaker = (text) => {

		var li = document.createElement('li');
		console.log("watość teskt to ", text.task);
		li.textContent = text.task + ' -#' + counter++;
		li.setAttribute("data-id", text.id)
		ul.appendChild(li);
	};

	/*read */
	let readTask = () => {
		$ul.empty();
		$.ajax({
			url: "http://localhost:3000/tasks",
			type: "GET"
		}).done(function (r) {
			console.log(r);
			r.forEach(function (e) {
				liMaker(e)
			})
		})
	};
	readTask();

	/*create*/
	let createTask = (data) => {
		$.ajax({
			url: 'http://localhost:3000/tasks',
			type: 'POST',
			data: data
		}).done(() => {
			readTask();
		})
	}

	/*delete*/
	let deleteTask = (id) => {
		$.ajax({
			url: 'http://localhost:3000/tasks/' + id,
			type: 'DELETE'
		})
	};

	/*add action*/
	btnAdd.addEventListener('click', () => {

		if (task.value.trim() === '') {
			let emptyTxt = task.value.replace(/\s/g, '')
			task.value = emptyTxt;
			task.placeholder = 'write a task';
			return
		} else {
			task.placeholder = 'to do ...';
		}
		let taskValue = task.value;
		let data = {
			task: taskValue,
		}
		createTask(data)
		task.value = '';
		counter = 1;
	});

	/*remove action*/
	btnDel.addEventListener('click', () => {
		let lastTask = document.querySelector('ul li:last-child');

		if (lastTask) {
			let idTask = lastTask.getAttribute('data-id')
			lastTask.classList.add('removeLi');
			setTimeout(() => {
				lastTask.parentElement.removeChild(lastTask);
				deleteTask(idTask);
			}, removeLastTask);
		}
		counter--;
	});

	/*clear acton*/
	btnCl.addEventListener('click', () => {
		let tasksList = document.querySelectorAll('ul li');
		for (let i = 0; i < tasksList.length; i++) {
			if (i % 2 == 0) {
				tasksList[i].classList.add('leftDirection')
			} else {
				tasksList[i].classList.add('rightDirection')
			}
			let idTask = tasksList[i].getAttribute('data-id');
			deleteTask(idTask);
		}
		counter = 1;
	});

})