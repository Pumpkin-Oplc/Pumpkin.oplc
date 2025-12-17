# global.gd
extends Node

var dados = {
	"point": 0,
}

const SAVE_PATH := "user://save.json"

func salvar():
	var file = FileAccess.open(SAVE_PATH, FileAccess.WRITE)
	file.store_string(JSON.stringify(dados))
	file.close()

func carregar():
	if not FileAccess.file_exists(SAVE_PATH):
		return
	var file = FileAccess.open(SAVE_PATH, FileAccess.READ)
	dados = JSON.parse_string(file.get_as_text())
	file.close()
