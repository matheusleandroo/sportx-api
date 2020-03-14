import * as Yup from 'yup';
import Customer from '../models/Customer';

class CustomerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string()
        .required()
        .max(100),
      tipo: Yup.number().required(),
      documento: Yup.string()
        .min(11)
        .max(14),
      razao: Yup.string().max(100),
      cep: Yup.string()
        .min(8)
        .max(8),
      email: Yup.string()
        .required()
        .email(),
      classificacao: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const EmailExists = await Customer.findOne({
      where: { email: req.body.email },
    });

    if (EmailExists) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const DocumentExists = await Customer.findOne({
      where: { documento: req.body.documento },
    });

    if (DocumentExists) {
      return res.status(400).json({ error: 'Document already exists.' });
    }

    const {
      id,
      nome,
      tipo,
      documento,
      cnpj,
      razao,
      cep,
      email,
      classificacao,
    } = await Customer.create(req.body);

    return res.json({
      id,
      nome,
      tipo,
      documento,
      cnpj,
      razao,
      cep,
      email,
      classificacao,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().max(100),
      tipo: Yup.number(),
      documento: Yup.string()
        .min(11)
        .max(14),
      razao: Yup.string().max(100),
      cep: Yup.string()
        .min(8)
        .max(8),
      email: Yup.string().email(),
      classificacao: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const customer = await Customer.findByPk(req.params.id);

    if (!customer) {
      return res.status(400).json({ error: 'Customer not found.' });
    }

    const novoEmail = req.body.email;

    if (novoEmail && novoEmail !== customer.email) {
      const customerExists = await Customer.findOne({
        where: { email: novoEmail },
      });

      if (customerExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    const novoDocumento = req.body.documento;

    if (novoDocumento && novoDocumento !== customer.email) {
      const customerExists = await Customer.findOne({
        where: { documento: novoDocumento },
      });

      if (customerExists) {
        return res.status(400).json({ error: 'Document already exists.' });
      }
    }

    const {
      id,
      nome,
      tipo,
      documento,
      cnpj,
      razao,
      cep,
      email,
      classificacao,
    } = await customer.update(req.body);

    return res.json({
      id,
      nome,
      tipo,
      documento,
      cnpj,
      razao,
      cep,
      email,
      classificacao,
    });
  }
}

export default new CustomerController();
