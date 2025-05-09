"""Atualizando esquema de banco de dados

Revision ID: 9ef0630d49ed
Revises: 
Create Date: 2025-04-20 18:39:02.630361

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ef0630d49ed'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('usuarios',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('email', sa.String(length=175), nullable=False),
    sa.Column('senha', sa.String(length=10), nullable=False),
    sa.Column('nome_usuario', sa.String(length=30), nullable=False),
    sa.Column('telefone', sa.String(length=11), nullable=True),
    sa.Column('endereco_rua', sa.String(length=255), nullable=True),
    sa.Column('endereco_numero', sa.String(length=10), nullable=True),
    sa.Column('endereco_cidade', sa.String(length=100), nullable=True),
    sa.Column('endereco_estado', sa.String(length=50), nullable=True),
    sa.Column('endereco_cep', sa.String(length=10), nullable=True),
    sa.Column('data_criacao', sa.DateTime(), nullable=True),
    sa.Column('tipo_usuario', sa.String(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('nome_usuario')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('usuarios')
    # ### end Alembic commands ###
