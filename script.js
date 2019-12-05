document.addEventListener("DOMContentLoaded", function () {
	let ulList = $('ul');
	const btnAdd = document.querySelector('.btn.add');
	const btnDel = document.querySelector('.btn.delete');
	const btnCl = document.querySelector('.btn.clear');
	let counter = 1;

	const ul = document.querySelector('ul');
	let task = document.querySelector('input');

	let liMaker = (text) => {
		var li = document.createElement('li');
		console.log("watość teskt to ", text.task);
		li.textContent = text.task + ' -#' + counter++;
		//li.classList.add('appear');
		li.setAttribute("data-id", text.id)
		ul.appendChild(li);
	};


	/*read */

	let readTask = () => {
		ulList.empty();
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
		}).done(() => {
			readTask();
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
	});


	/*remove action*/
	btnDel.addEventListener('click', () => {
		let lastTask = document.querySelector('ul li:last-child');

		if (lastTask) {
			let idTask = lastTask.getAttribute('data-id')
			lastTask.classList.add('removeLi');
			lastTask.parentElement.removeChild(lastTask);

			counter--
			console.log("idTask w funkcj usun osttn element to", idTask);
			deleteTask(idTask);
		}
	});

	/*clear acton*/
	btnCl.addEventListener('click', () => {
		let tasksList = document.querySelectorAll('ul li');
		for (let i = 0; i < tasksList.length; i++) {
			let idTask = tasksList[i].getAttribute('data-id');
			deleteTask(idTask);

		}

	});


})