from latemia_app import db
from datetime import datetime



# Modelo de Usuário

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(175), nullable=False, unique=True)
    senha = db.Column(db.String(10), nullable=False)
    nome_usuario = db.Column(db.String(30), nullable=False, unique=True)
    telefone = db.Column(db.String(11))
    endereco_rua = db.Column(db.String(255))
    endereco_numero = db.Column(db.String(10))
    endereco_cidade = db.Column(db.String(100))
    endereco_estado = db.Column(db.String(50))
    endereco_cep = db.Column(db.String(10))
    data_criacao = db.Column(db.DateTime, default=datetime.now)
    tipo_usuario = db.Column(db.String(10), default='normal')
    
    # Relacionamento com os pets (um usuário pode ter vários pets)
    pets = db.relationship('Pet', backref='usuario', lazy=True)

    def __repr__(self):
        return f'<Usuario {self.nome_usuario}>'
    

# Modelo de Pet

class Pet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(30), nullable=False)
    raca = db.Column(db.String(30))
    idade = db.Column(db.Integer)
    sexo = db.Column(db.String(6))
    observacoes = db.Column(db.Text)
    foto = db.Column(db.LargeBinary)
    data_criacao = db.Column(db.DateTime, default=datetime.now)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

    # Relacionamento com os agendamentos (um pet pode ter vários agendamentos)
    agendamentos = db.relationship('Agendamento', backref='pet', lazy=True)

    def __repr__(self):
        return f'<Pet {self.nome}>'


# Modelo de Agendamento

class Agendamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'), nullable=False)
    tipo_servico = db.Column(db.String(100))
    data_hora = db.Column(db.DateTime)
    status = db.Column(db.String(50))
    observacoes = db.Column(db.Text)
    data_criacao = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return f'<Agendamento {self.tipo_servico} - {self.data_hora}>'


# Modelo de Agendamento de Uber Pet

class AgendamentoUberPet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agendamento_id = db.Column(db.Integer, db.ForeignKey('agendamento.id'), nullable=False)
    endereco_origem = db.Column(db.String(255))
    endereco_destino = db.Column(db.String(255))
    status = db.Column(db.String(50))
    data_hora = db.Column(db.DateTime)
    observacoes = db.Column(db.Text)
    data_criacao = db.Column(db.DateTime, default=datetime.now)

    agendamento = db.relationship('Agendamento', backref='agendamento_uber', uselist=False)

    def __repr__(self):
        return f'<AgendamentoUberPet {self.endereco_origem} -> {self.endereco_destino}>'


# Modelo de Agendamento de Hotel Pet

class AgendamentoHotelPet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agendamento_id = db.Column(db.Integer, db.ForeignKey('agendamento.id'), nullable=False)
    data_check_in = db.Column(db.DateTime)
    data_check_out = db.Column(db.DateTime)
    status = db.Column(db.String(50))
    observacoes = db.Column(db.Text)
    data_criacao = db.Column(db.DateTime, default=datetime.now)

    agendamento = db.relationship('Agendamento', backref='agendamento_hotel', uselist=False)

    def __repr__(self):
        return f'<AgendamentoHotelPet {self.data_check_in} -> {self.data_check_out}>'


# Modelo de Agendamento de Vacinação

class AgendamentoVacinacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agendamento_id = db.Column(db.Integer, db.ForeignKey('agendamento.id'), nullable=False)
    tipo_vacina = db.Column(db.String(100))
    data_vacinacao = db.Column(db.DateTime)
    status = db.Column(db.String(50))
    observacoes = db.Column(db.Text)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    agendamento = db.relationship('Agendamento', backref='agendamento_vacinacao', uselist=False)

    def __repr__(self):
        return f'<AgendamentoVacinacao {self.tipo_vacina} - {self.data_vacinacao}>'


# Modelo de Agendamento de Tosa

class AgendamentoTosa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agendamento_id = db.Column(db.Integer, db.ForeignKey('agendamento.id'), nullable=False)
    tipo_tosa = db.Column(db.String(100))
    data_tosa = db.Column(db.DateTime)
    status = db.Column(db.String(50))
    observacoes = db.Column(db.Text)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)

    agendamento = db.relationship('Agendamento', backref='agendamento_tosa', uselist=False)

    def __repr__(self):
        return f'<AgendamentoTosa {self.tipo_tosa} - {self.data_tosa}>'
    
