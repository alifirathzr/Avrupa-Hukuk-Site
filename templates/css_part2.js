module.exports = `
/* Cards & Grid */
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; }
.card { background: var(--white); padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: var(--transition); border-top: 5px solid var(--accent); display: flex; flex-direction: column; border: 1px solid rgba(197, 160, 89, 0.1); }
.card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-color: var(--accent); }
.card-icon { font-size: 2.8rem; color: var(--accent); margin-bottom: 1.5rem; }
.card h3 { color: var(--primary); margin-bottom: 1rem; font-size: 1.45rem; line-height: 1.3; }
.card p { color: var(--text-muted); font-size: 0.98rem; margin-bottom: 2rem; flex-grow: 1; line-height: 1.7; }
.card-link { color: var(--accent); font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; transition: var(--transition); font-size: 0.95rem; }
.card-link:hover { color: var(--primary); gap: 0.8rem; }

/* Live Article Search */
.search-container { max-width: 600px; margin: 0 auto 3rem auto; position: relative; }
.search-container input { width: 100%; padding: 1rem 1.5rem 1rem 3rem; border: 2px solid #e2e8f0; border-radius: 50px; font-size: 1rem; outline: none; transition: var(--transition); background: var(--white); }
.search-container input:focus { border-color: var(--accent); box-shadow: 0 6px 15px rgba(197, 160, 89, 0.15); }
.search-container i { position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 1.1rem; }

/* Accordion FAQ */
.accordion { max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
.accordion-item { background: var(--white); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0; }
.accordion-header { width: 100%; padding: 1.25rem 1.5rem; background: none; border: none; text-align: left; font-family: 'Cinzel', serif; font-size: 1.1rem; font-weight: 600; color: var(--primary); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: var(--transition); }
.accordion-header:hover { color: var(--accent); }
.accordion-header i { transition: transform 0.3s ease; color: var(--accent); }
.accordion-item.active .accordion-header i { transform: rotate(180deg); }
.accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; padding: 0 1.5rem; color: var(--text-muted); }
.accordion-item.active .accordion-content { max-height: 300px; padding: 0 1.5rem 1.25rem 1.5rem; }

/* Contact Section & Map */
.contact-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: var(--white); padding: 3.5rem; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.07); }
.contact-info-list { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem; }
.contact-item { display: flex; align-items: flex-start; gap: 1rem; }
.contact-item i { font-size: 1.25rem; color: var(--accent); margin-top: 0.2rem; min-width: 24px; }
.contact-item div h4 { font-size: 1rem; color: var(--primary); font-weight: 600; margin-bottom: 0.2rem; }
.contact-item div p, .contact-item div a { color: var(--text-muted); font-size: 0.95rem; transition: var(--transition); }
.contact-item div a:hover { color: var(--accent); }

.map-container { margin-top: 3rem; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
.map-container iframe { width: 100%; height: 400px; border: 0; display: block; }

.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--primary); }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.85rem 1rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; font-family: 'Inter', sans-serif; transition: var(--transition); background: var(--white); }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.15); }
.checkbox-group { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.checkbox-group input { width: auto; margin-top: 4px; accent-color: var(--accent); }
.checkbox-group a { color: var(--accent); text-decoration: underline; }
`;
