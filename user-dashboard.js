
document.addEventListener('DOMContentLoaded', function() {
  // 1. TItulo efeitin bobo
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = "Área do Cliente";
    let i = 0;
    heroTitle.textContent = '';
    
    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroTitle.classList.add('pulse-animation');
        }, 1000);
      }
    }
    typeWriter();
  }

  // 2. NAVEGA
  const links = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".user-page");
  
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      
      const target = link.getAttribute("href").substring(1);
      
      pages.forEach(p => {
        p.classList.remove("active");
      });
      
      links.forEach(l => l.classList.remove("active"));
      
      document.getElementById(target).classList.add("active");
      link.classList.add("active");
    });
  });

  // 3. AGENDAMENTO DARG
  const appointments = document.querySelectorAll('.appointment');
  const appointmentContainer = document.querySelector('.upcoming-appointments');
  
  if (appointmentContainer) {
    appointmentContainer.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(appointmentContainer, e.clientY);
      const draggable = document.querySelector('.dragging');
      
      if (afterElement == null) {
        appointmentContainer.appendChild(draggable);
      } else {
        appointmentContainer.insertBefore(draggable, afterElement);
      }
    });
  }

  appointments.forEach(appointment => {
    appointment.addEventListener('dragstart', () => {
      setTimeout(() => {
        appointment.classList.add('dragging');
      }, 0);
    });
    
    appointment.addEventListener('dragend', () => {
      appointment.classList.remove('dragging');
    });
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.appointment:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // 4. CANCELAR CONFIRMA
  const cancelButtons = document.querySelectorAll('.btn-cancel');
  cancelButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const card = this.closest('.appointment-card');
      card.style.transform = 'scale(0.95)';
      card.style.opacity = '0.8';
      
      const confirmDiv = document.createElement('div');
      confirmDiv.className = 'confirm-delete';
      confirmDiv.innerHTML = `
        <p>Cancelar este agendamento?</p>
        <div class="confirm-buttons">
          <button class="confirm-yes">Sim</button>
          <button class="confirm-no">Não</button>
        </div>
      `;
      
      card.appendChild(confirmDiv);
      
      confirmDiv.querySelector('.confirm-yes').addEventListener('click', () => {
        card.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
          card.remove();
          showNotification('Agendamento cancelado com sucesso!', 'success');
        }, 300);
      });
      
      confirmDiv.querySelector('.confirm-no').addEventListener('click', () => {
        card.style.transform = '';
        card.style.opacity = '';
        confirmDiv.remove();
      });
    });
  });

  // 5. EFEITO DIGITAR
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    const placeholderText = input.getAttribute('placeholder');
    input.setAttribute('placeholder', '');
    
    let i = 0;
    function typePlaceholder() {
      if (i < placeholderText.length) {
        input.placeholder += placeholderText.charAt(i);
        i++;
        setTimeout(typePlaceholder, 50);
      } else {
        setTimeout(() => {
          input.placeholder = '';
          i = 0;
          typePlaceholder();
        }, 2000);
      }
    }
    typePlaceholder();
  });

  // 6. Animação dos botao carregano
  const loadingButtons = document.querySelectorAll('.btn-loading');
  loadingButtons.forEach(button => {
    button.addEventListener('click', function() {
      const originalText = this.innerHTML;
      this.innerHTML = `
        <span class="loading-spinner"></span>
        Processando...
      `;
      this.disabled = true;
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
        
        // confirmação
        this.classList.add('btn-success');
        setTimeout(() => {
          this.classList.remove('btn-success');
        }, 2000);
      }, 2000);
    });
  });

  // 7. PROM<OTION
  const promoCarousel = document.querySelector('.promo-carousel .carousel');
  if (promoCarousel) {
    const items = promoCarousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    function showItem(index) {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    }
    
    const nextBtn = promoCarousel.querySelector('.carousel-next');
    const prevBtn = promoCarousel.querySelector('.carousel-prev');
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
      });
    }
    
    // play
    let interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    }, 5000);
    
    promoCarousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    promoCarousel.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
      }, 5000);
    });
  }

  // 8. FORMUILAS
  const forms = document.querySelectorAll('.user-settings-form');
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach(field => {
          field.classList.add('is-invalid');
          field.style.animation = 'shake 0.5s';
          
          setTimeout(() => {
            field.style.animation = '';
          }, 500);
        });
      }
      
      form.classList.add('was-validated');
    }, false);
  });

  // 9. EFEITIN
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple-effect');
    
    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  }
  
  const rippleButtons = document.querySelectorAll('.ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', createRipple);
  });

  // 10. Notifica
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
      showNotification('Você tem 2 novas notificações!', 'info');
    });
  }

  // NOTIFICAÇÕES
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `floating-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-bell"></i>
        <p>${message}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

// 11. ADICIONAR PET 
const addPetBtn = document.querySelector('.btn-add-pet');
if (addPetBtn) {
  addPetBtn.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'pet-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-header">
          <i class="fas fa-paw modal-icon"></i>
          <h3>Adicionar Novo Pet</h3>
          <p>Preencha os dados do seu pet</p>
        </div>
        
        <form class="pet-form">
          <div class="form-row">
            <div class="form-group photo-upload">
              <div class="photo-preview" id="petPhotoPreview">
                <i class="fas fa-camera"></i>
                <span>Adicionar Foto</span>
              </div>
              <input type="file" id="petPhotoUpload" accept="image/*" style="display: none;">
            </div>
            
            <div class="form-group">
              <label><i class="fas fa-tag"></i> Nome do Pet</label>
              <input type="text" class="input-animated" placeholder="Ex: Rex" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label><i class="fas fa-dog"></i> Espécie</label>
              <select class="input-animated" required>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
              </select>
            </div>
            
            <div class="form-group">
              <label><i class="fas fa-dna"></i> Raça</label>
              <input type="text" class="input-animated" placeholder="Ex: Golden Retriever" required>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label><i class="fas fa-birthday-cake"></i> Idade</label>
              <div class="age-input">
                <input type="number" class="input-animated" min="0" max="30" placeholder="0" required>
                <span>anos</span>
              </div>
            </div>
            
            <div class="form-group">
              <label><i class="fas fa-venus-mars"></i> Sexo</label>
              <div class="gender-options">
                <label class="gender-option">
                  <input type="radio" name="gender" value="male" checked>
                  <span class="gender-btn"><i class="fas fa-mars"></i> Macho</span>
                </label>
                <label class="gender-option">
                  <input type="radio" name="gender" value="female">
                  <span class="gender-btn"><i class="fas fa-venus"></i> Fêmea</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label><i class="fas fa-sticky-note"></i> Observações</label>
            <textarea class="input-animated" placeholder="Alguma informação importante sobre seu pet?"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-save">
              <i class="fas fa-save"></i> Salvar Pet
            </button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Foto do PET (PEWVIEW)
    const photoUpload = modal.querySelector('#petPhotoUpload');
    const photoPreview = modal.querySelector('#petPhotoPreview');
    
    photoUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          photoPreview.innerHTML = `<img src="${event.target.result}" alt="Preview da foto do pet">`;
          photoPreview.classList.add('has-image');
        };
        reader.readAsDataURL(file);
      }
    });
    
    photoPreview.addEventListener('click', function() {
      photoUpload.click();
    });
    
    // Fechar 
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.pet-form').addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Pet adicionado com sucesso!', 'success');
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    });
  });
}

 // 12. Agendamento
const newAppointmentBtn = document.querySelector('.btn-new-appointment');
if (newAppointmentBtn) {
  newAppointmentBtn.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.className = 'appointment-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-header">
          <i class="fas fa-calendar-plus modal-icon"></i>
          <h3>Novo Agendamento</h3>
          <p>Agende um serviço para seu pet</p>
        </div>
        
        <form class="appointment-form">
          <div class="form-group">
            <label><i class="fas fa-paw"></i> Selecione o Pet</label>
            <div class="pet-selector">
              <div class="pet-option selected">
                <img src="/Users/Vinicius/Documents/images.jpg" alt="Rex">
                <span>Rex</span>
              </div>
              <div class="pet-option">
                <img src="/Users/Vinicius/Documents/Luna.jpg" alt="Luna">
                <span>Luna</span>
              </div>
              <div class="pet-option add-new">
                <i class="fas fa-plus"></i>
                <span>Adicionar Pet</span>
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label><i class="fas fa-cut"></i> Tipo de Serviço</label>
              <select class="input-animated" required>
                <option value="">Selecione</option>
                <option value="banho">Banho</option>
                <option value="tosa">Tosa</option>
                <option value="banho-tosa">Banho e Tosa</option>
                <option value="consulta">Consulta Veterinária</option>
                <option value="vacina">Vacinação</option>
                <option value="spa">Dia de SPA</option>
              </select>
            </div>
            
            <div class="form-group">
              <label><i class="fas fa-user-md"></i> Profissional</label>
              <select class="input-animated">
                <option value="">Qualquer disponível</option>
                <option value="vet1">Dr. Carlos (Veterinário)</option>
                <option value="tosa1">Ana (Tosadora)</option>
                <option value="tosa2">Marcos (Tosador)</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label><i class="fas fa-calendar-day"></i> Data</label>
              <input type="date" class="input-animated" required>
            </div>
            
            <div class="form-group">
              <label><i class="fas fa-clock"></i> Horário</label>
              <select class="input-animated" required>
                <option value="">Selecione</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label><i class="fas fa-sticky-note"></i> Observações</label>
            <textarea class="input-animated" placeholder="Alguma informação importante para o atendimento?"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-save">
              <i class="fas fa-calendar-check"></i> Confirmar Agendamento
            </button>
          </div>
        </form>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Seleção de pet
    const petOptions = modal.querySelectorAll('.pet-option');
    petOptions.forEach(option => {
      option.addEventListener('click', function() {
        if (!this.classList.contains('add-new')) {
          petOptions.forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');
        } else {
          // Abrir coiso de adicionar pet
          modal.remove();
          addPetBtn.click();
        }
      });
    });
    
    // Fechar 
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.btn-cancel').addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    });
    
    modal.querySelector('.appointment-form').addEventListener('submit', function(e) {
      e.preventDefault();
      showNotification('Agendamento realizado com sucesso!', 'success');
      modal.style.animation = 'fadeOut 0.3s forwards';
      setTimeout(() => modal.remove(), 300);
    });
  });
}

  // Estilo
  const style = document.createElement('style');
  style.textContent = `
    .floating-notification {
      position: fixed;
      top: 20px;
      right: -300px;
      background: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      z-index: 1000;
      transition: right 0.3s ease;
    }
    
    .floating-notification.show {
      right: 20px;
    }
    
    .floating-notification.success {
      border-left: 4px solid var(--azul);
    }
    
    .floating-notification.info {
      border-left: 4px solid var(--laranja);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
    }
    
    .notification-content i {
      margin-right: 10px;
      font-size: 20px;
    }
    
    .notification-content p {
      margin: 0;
      font-weight: 600;
    }
    
    .pet-modal, .appointment-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
    }
    
    .modal-content {
      background-color: var(--branco);
      padding: 25px;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
      position: relative;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    
    .close-modal {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
      color: var(--cinza-escuro);
      transition: color 0.3s;
    }
    
    .close-modal:hover {
      color: var(--azul-escuro);
    }
    
    .confirm-delete {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      z-index: 2;
    }
    
    .confirm-delete p {
      margin-bottom: 15px;
      font-weight: 600;
      color: var(--azul-escuro);
    }
    
    .confirm-buttons {
      display: flex;
      gap: 10px;
    }
    
    .confirm-yes, .confirm-no {
      padding: 8px 20px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .confirm-yes {
      background-color: var(--azul);
      color: white;
    }
    
    .confirm-yes:hover {
      background-color: var(--azul-escuro);
    }
    
    .confirm-no {
      background-color: var(--cinza);
    }
    
    .confirm-no:hover {
      background-color: #e0e0e0;
    }
    
    @keyframes fadeOut {
      to {
        opacity: 0;
        transform: scale(0.9);
      }
    }
    
    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-right: 8px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});