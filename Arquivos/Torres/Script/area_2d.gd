extends Area2D

@export var caminho_cena := "res://Cenas/Inicio/Inicio.tscn"

func _ready():
	if is_inside_tree():
		body_entered.connect(_on_body_entered)
	else:
		connect("tree_entered", Callable(self, "_conectar_sinal"))

func _conectar_sinal():
	body_entered.connect(_on_body_entered)

func _on_body_entered(body):
	if body.is_in_group("player"):
		call_deferred("_trocar_cena")

func _trocar_cena():
	LostCena.mostrar_lost = true
	get_tree().change_scene_to_file(caminho_cena)
