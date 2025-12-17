extends Node2D

@onready var lost = $lost

func _ready():
	lost.visible = LostCena.mostrar_lost
	LostCena.mostrar_lost = false
