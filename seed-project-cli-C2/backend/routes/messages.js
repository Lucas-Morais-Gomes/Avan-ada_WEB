var express = require("express");
var router = express.Router();

const Message = require("../models/message");

// Adicionando Mensagem
router.post("/", async function (req, res, next) {
  const messageObject = new Message({
    content: req.body.content,
  });
  try {
    const messageSave = await messageObject.save();
    console.log(messageSave);

    res.status(201).json({
      myMsgSucesso: "Mensagem salva com sucesso",
      objMessageSave: messageSave,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Serve-Side: Um erro aconteceu ao salvar a mensagem",
      myError: err,
    });
  }
});

// Recuperando todas as mensangens
router.get("/", async function (req, res, next) {
  try {
    const messageFindTodos = await Message.find({});

    res.status(200).json({
      myMsgSucesso: "Mensagem recuperada com sucesso!",
      objSMessageSRecuperadoS: messageFindTodos,
    });
  } catch (err) {
    return res.status(500).json({
      myErrorTitle: "Server-Side: Um erro aconteceu ao buscar as MensagenS",
      myError: err,
    });
  }
});

// Deletando uma mensagem
router.delete("/:_id", async function (req, res, next) {
  const messageId = req.params._id;
  console.log('ID da mensagem a ser excluída:', messageId);

  // Verificar se a mensagem existe antes de tentar excluí-la
  const message = await Message.findById(messageId);
  if (!message) {
    console.error('Mensagem não encontrada para o ID fornecido:', messageId);
    return res.status(404).json({
      myErrorTitle: "Server-Side: Mensagem não encontrada",
      myError: "A mensagem com o ID fornecido não foi encontrada.",
    });
  }

  try {
    await Message.findByIdAndDelete(messageId);
    console.log('Mensagem excluída com sucesso no banco de dados');
    res.status(200).json({ myMsgSucesso: "Mensagem excluída com sucesso no banco de dados" });
  } catch (err) {
    console.error('Erro ao excluir a mensagem no banco de dados:', err);
    return res.status(500).json({
      myErrorTitle: "Server-Side: Um erro aconteceu ao excluir a mensagem no banco de dados",
      myError: err,
    });
  }
});

// Atualizando uma mensagem
router.put("/:_id", async function (req, res, next) {
  const messageId = req.params._id;
  console.log('ID da mensagem a ser atualizada:', messageId);

  // Verificar se a mensagem existe antes de tentar atualizá-la
  const message = await Message.findById(messageId);
  if (!message) {
    console.error('Mensagem não encontrada para o ID fornecido:', messageId);
    return res.status(404).json({
      myErrorTitle: "Server-Side: Mensagem não encontrada",
      myError: "A mensagem com o ID fornecido não foi encontrada.",
    });
  }

  try {
    // Atualizar a mensagem com os novos dados fornecidos no corpo da solicitação
    console.log("Novo Conteudo:", req.body.content)
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { content: req.body.content }, { new: true });
    console.log('Mensagem atualizada com sucesso:', updatedMessage);
    res.status(200).json({ myMsgSucesso: "Mensagem atualizada com sucesso", updatedMessage });
  } catch (err) {
    console.error('Erro ao atualizar a mensagem no banco de dados:', err);
    return res.status(500).json({
      myErrorTitle: "Server-Side: Um erro aconteceu ao atualizar a mensagem no banco de dados",
      myError: err,
    });
  }
});


module.exports = router;
