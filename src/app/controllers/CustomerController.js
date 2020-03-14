import * as Yup from 'yup';

import Customer from '../models/Customer';
import Phone from '../models/Phone';

class CustomerController {
  async index(req, res) {
    const { page = 1, tipo = 0, classificacao = 0 } = req.query;

    let filtroTipo = [];

    if (tipo !== 0) filtroTipo = [tipo];
    else filtroTipo = [1, 2];

    let filtroClassificacao = [];

    if (classificacao !== 0) filtroClassificacao = [classificacao];
    else filtroClassificacao = [1, 2, 3];

    try {
      const customer = await Customer.findAll({
        order: [['created_at', 'desc']],
        limit: 5,
        offset: (page - 1) * 5,
        include: [
          {
            model: Phone,
            as: 'phones',
            attributes: ['id', 'number'],
            required: false,
          },
        ],
        where: [{ tipo: filtroTipo }, { classificacao: filtroClassificacao }],
      });

      return res.status(200).json(customer);
    } catch (error) {
      return res.status(400).json({ error: 'Search failed.' });
    }
  }

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
      phones: Yup.array().of(
        Yup.object().shape({
          number: Yup.string(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    try {
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

      const { phones } = req.body;
      let responsePhone = [];

      try {
        if (id && phones) {
          await Promise.all(
            phones.map(async item => {
              await Phone.create({
                customer_id: id,
                number: item.number,
              });
            })
          );

          responsePhone = await Phone.findAll({ where: { customer_id: id } });
        }
      } catch (error) {
        return res.status(400).json({
          error:
            'Customer was created with success, but the customer phone failed.',
        });
      }

      return res.status(201).json({
        id,
        nome,
        tipo,
        documento,
        cnpj,
        razao,
        cep,
        email,
        classificacao,
        phones: responsePhone,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Customer create failed.' });
    }
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
      phones: Yup.array().of(
        Yup.object().shape({
          id: Yup.number(),
          number: Yup.string(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    try {
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

      if (novoDocumento && novoDocumento !== customer.documento) {
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

      const { phones } = req.body;
      let responsePhone = [];

      try {
        if (phones) {
          await Promise.all(
            phones.map(async item => {
              if (item.id) {
                await Phone.update(
                  { number: item.number },
                  { where: { id: item.id } }
                );
              }
              await Phone.create({
                customer_id: id,
                number: item.number,
              });
            })
          );

          responsePhone = await Phone.findAll({ where: { customer_id: id } });
        }
      } catch (error) {
        return res.status(400).json({
          error:
            'Customer was created with success, but the customer phone failed.',
        });
      }

      return res.status(200).json({
        id,
        nome,
        tipo,
        documento,
        cnpj,
        razao,
        cep,
        email,
        classificacao,
        phones: responsePhone,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Search failed.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(400).json({ error: 'customer not found.' });
    }

    try {
      await customer.destroy(id);
      return res.status(200).json({ sucess: 'Deleted with sucess.' });
    } catch (error) {
      return res.status(400).json({ erro: 'Delete failed.' });
    }
  }
}

export default new CustomerController();
