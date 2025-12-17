extends Node2D

@export var velocidade := 300.0
@export var espacamento := 700.0
@export var limite_esq := -700.0
@export var altura_min := 0
@export var altura_max := 300

@export var quantidade := 3

var TorreScene = preload("res://Arquivos/Torres/Torres.tscn")
var torres := []

@onready var label_pontos = get_parent().get_node("CanvasLayer/Label")

var pontos := 0

func _ready():
	for i in range(quantidade):
		var torre = TorreScene.instantiate()
		add_child(torre)
		torre.position.x = i * espacamento
		torre.position.y = randi_range(altura_min, altura_max)
		torres.append(torre)

func _process(delta):
	for i in range(torres.size() - 1, -1, -1):
		var torre = torres[i]
		torre.position.x -= velocidade * delta

		if torre.position.x < limite_esq:
			torre_passou(torre)
			var maior_x = get_maior_x()
			torre.position.x = maior_x + espacamento
			torre.position.y = randi_range(altura_min, altura_max)

func get_maior_x() -> float:
	var maior = torres[0].position.x
	for t in torres:
		if t.position.x > maior:
			maior = t.position.x
	return maior

func torre_passou(_torre):
	pontos += 5
	label_pontos.text = str("Points: ", pontos) 
	
	Global.carregar()
	if (pontos >= Global.dados.point):
		Global.dados.point = pontos
		Global.salvar()
		
	pass
