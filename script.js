document.addEventListener("DOMContentLoaded", function () {

	const animationDelay = 1;
	const removeLastTask = 1900;
	const clearList = 4000;

	setTimeout(() => {
		let liAppear = document.querySelectorAll('.appear');
		for (let i = 0; i < liAppear.length; i++) {
			liAppear[i].classList.remove('appear');
		}
	}, animationDelay);

	const btnAdd = document.querySelector('.btn.add');
	const btnDel = document.querySelector('.btn.delete');
	const btnCl = document.querySelector('.btn.clear');
	let counter = 1;
	const arrayId = [0];
	const sortNr = (a, b) => {
		return a - b;
	}
	const idTask = arrayId.sort(sortNr)[arrayId.length - 1] + 1;
	const ul = document.querySelector('ul');
	let task = document.querySelector('input');

	let liMaker = (text) => {
		var li = document.createElement('li');
		li.textContent = text + ' -#' + counter++;
		li.classList.add('appear');
		li.setAttribute("data-id", idTask)
		ul.appendChild(li);
	};

	const clearTasksList = () => {
		let taskList = document.querySelectorAll('ul li');

		for (let i = 0; i < taskList.length; i++) {
			if (i % 2 == 0) {
				taskList[i].classList.add('leftDirection');
			} else {
				taskList[i].classList.add('rightDirection');
			}
			setTimeout(() => {
				taskList[i].parentNode.removeChild(taskList[i]);
			}, clearList);
			deleteTask(taskList[i].getAttribute('task-id'));
		}

		counter = 1;
	}

	const deleteTask = (id) => {
		$.ajax({
			url: 'http://localhost:3000/movies/' + id,
			type: 'DELETE'
		}).done(() => {
			console.log('SUKCES USUNIET ELEMENT O ID =   ', id);
		})
	};

	/*
	 * read element
	 */
	const readTask = () => {
		clearTasksList();
		$.ajax({
			url: "http://localhost:3000/tasks",
			type: "GET"
		}).done(function (r) {
			console.log(r);
			r.forEach(function (e) {

				console.log(e.id);
				liMaker(e.task);
				arrayId.push(e.id);

			})
		})
	};
	readTask();

	/*
	 * create element
	 */
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
			id: idTask
		}

		$.ajax({
			url: 'http://localhost:3000/tasks',
			type: 'POST',
			data: JSON.stringify(data)
		}).done(function (e) {
			readTask();
		})
		task.value = '';
	});


	/*
	 * remove last element
	 */
	btnDel.addEventListener('click', () => {
		let lastTask = document.querySelector('ul li:last-child');

		if (lastTask) {
			let idTask = lastTask.getAttribute('data-id')
			lastTask.classList.add('removeLi');
			setTimeout(() => {
				lastTask.parentElement.removeChild(lastTask);
			}, removeLastTask);
			counter--
			deleteTask(idTask);
		}
	});

	/*
	 * clear list
	 */
	btnCl.addEventListener('click', clearTasksList);


})