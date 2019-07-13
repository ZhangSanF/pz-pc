/**
 * 存储localStorage
 */
const sideName = 'PZ'
export const setLocalStorage = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(sideName+name, content);
}

/**
 * 获取localStorage
 */
export const getLocalStorage = name => {
	if (!name) return;
	return window.localStorage.getItem(sideName+name);
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
	if (!name) return;
	window.localStorage.removeItem(sideName+name);
}


/**
 * 存储sessionstorage
 */
export const setSessionStorage = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(sideName+name, content);
}

/**
 * 获取sessionstorage
 */
export const getSessionStorage = name => {
	if (!name) return;
	return window.sessionStorage.getItem(sideName+name);
}

/**
 * 删除sessionstorage
 */
export const removeSession = name => {
	if (!name) return;
	window.sessionStorage.removeItem(sideName+name);
}